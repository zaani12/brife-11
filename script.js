const mealList = document.getElementById("meal");


let html = " ";
for (let i = 1; i <= 6; i++) {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
  <div  class="container" class = "meal-item card "  style="width: 30rem; display: flex"  data-id = "${meal.idMeal}">
                      <div class="row" class = "meal-img">
                      <div class="card-body" class = "meal-name">

                          <img src = "${meal.strMealThumb}" class="card-img-top" alt = "food"  width ='100'>
                  
                          <h3 class="card-title">${meal.strMeal}</h3>
                          <button type="button" class="btn btn-primary morInfo" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          more infol
                         </button>
                      </div>
                      </div>
                  </div>
              `;

          console.log(data);
        });
      }

      mealList.innerHTML = html;
    });
};

// search ============================================

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#meal-name');
const resultsDiv = document.querySelector('#results');

searchForm.addEventListener('submit', e => {
  e.preventDefault();

  const mealName = searchInput.value;

  if (!mealName) {
    alert('Please enter a recipe name');
    return ;
  }

  // Envoie une requête HTTP à l'API MealDB pour rechercher des recettes par nom
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(response => response.json())
    .then(data => {
      // data contient les résultats de la recherche
      // Affiche les résultats de la recherche sur la page
      mealList.innerHTML = '';
      data.meals.forEach(meal => {
        const result = document.createElement('div');
        result.innerHTML = `<div class="container"  class = "meal-item card "  style="width: 30rem; display: flex"  data-id = "${meal.idMeal}">
        <div class = "meal-img">
        <div  class="card-body" class = "meal-name">

            <img src = "${meal.strMealThumb}" class="card-img-top" alt = "food"  width ='100'>
    
            <h3 class="card-title">${meal.strMeal}</h3>

            <button type="button" class="btn btn-primary morInfo" data-bs-toggle="modal" data-bs-target="#staticBackdrop">more infol</button>

          </div>
        </div>
    </div>
`;
        resultsDiv.appendChild(result);
      });
    });
    return ;
  
});



window.onclick = function moreInformation(e) {
  
;
  if (e.target.classList.contains("morInfo")) {

    let mealItem = e.target.parentElement.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    .then(function (response) {
    return response.json()
   })
   .then(function (data) {
    console.log(data);
   if (data.meals) {
    let showResult = document.getElementById("recipe-modal")
    let show = " "

    data.meals.forEach((meal) => {
      show += `
<div  class="container" class = "meal-item card "  style="width: 20rem; display: flex"  data-id = "${meal.idMeal}">
                  <div class="row" class = "meal-img">
                  <div class="card-body" class = "meal-name">
                  <h3 class="card-title">${meal.strMeal}</h3>
                      <img src = "${meal.strMealThumb}" class="card-img-top" alt = "food"  width ='100'>
                      <pclass="card-title">${meal.strInstructions} </p>
                      <a href = "${meal.strYoutube}" class="btn btn-primary" class = "recipe-btn">see Recipe in youtube</a>
                  </div>
                  </div>
              </div>
          `;
          showResult.innerHTML = show;


    });

  }

});

    console.log("zaani");
    
  }
};

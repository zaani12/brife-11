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
      mealList.innerHTML = '';
      data.meals.forEach(meal => {
      console.log(data);

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
    
  }let currentPage = 1;
  const mealsPerPage = 6;
  
  // Create the pagination buttons
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.classList.add('prev');
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.classList.add('next');
  pagination.appendChild(prevButton);
  pagination.appendChild(nextButton);
  
  // Append the pagination buttons to the DOM
  mealList.appendChild(pagination);
  
  // Function to update the meal cards displayed based on the current page
  function updateMeals() {
    // Get the start and end indexes for the current page
    const startIndex = (currentPage - 1) * mealsPerPage;
    const endIndex = startIndex + mealsPerPage;
  
    // Loop through all the meal cards and hide or show them based on the current page
    const allMeals = document.querySelectorAll('.meal-item');
    allMeals.forEach((meal, index) => {
      if (index >= startIndex && index < endIndex) {
        meal.style.display = 'block';
      } else {
        meal.style.display = 'none';
      }
    });
  
    // Disable the "Previous" button on the first page
    if (currentPage === 1) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }
  
    // Disable the "Next" button on the last page
    if (currentPage * mealsPerPage >= allMeals.length) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  }
  
  // Event listener for the "Previous" button
  prevButton.addEventListener('click', () => {
    currentPage--;
    updateMeals();
  });
  
  // Event listener for the "Next" button
  nextButton.addEventListener('click', () => {
    currentPage++;
    updateMeals();
  });
  
  // Call the updateMeals function to initially display the first page of meals
  updateMeals();
  
};

// arrays to stok data
const CategoryTable = []
const AreaTable = []
const idArrayCategory = []
const idArrayArea = []
let  filteredTd =[]
const form = document.getElementById("search-form");

let html = " ";



form.addEventListener('submit', e => {
  e.preventDefault();
// get categorys id =================================
  const category = document.getElementById("category")

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.value}`)
   .then(function (response) {
   return response.json();
  })
   .then(function (data) {
   CategoryTable.push(data)
    console.log(data);
    if(data.meals){
      data.meals.forEach((meal) => {
        idArrayCategory.push(meal.idMeal);
      });
      };
    }
  
  );
  console.log(idArrayCategory);
// get area id =======================================
  const region = document.getElementById("region")
  
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${region.value}`)
     .then(function (response) {
     return response.json();
    })
     .then(function (data) {
      AreaTable.push(data)
      console.log(data);
      if(data.meals){
        data.meals.forEach((meal) => {
          idArrayArea.push(meal.idMeal);
        });
        };
        // filtere id ================================
         let match = idArrayArea.filter(function (e) {
          return idArrayCategory.indexOf(e) > -1;

          

        });
      const showResult = document.getElementById("shozResults")

        
    for(let i = 0 ; i <= match.length ;i++ ) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match[i]}`)
      .then(function (response) {
      return response.json()
     })
     .then(function (data) {
      console.log(data);
     if (data.meals) {

      data.meals.forEach((meal) => {
        html += `
<div  class="container" class = "meal-item card "  style="width: 30rem; display: flex"  data-id = "${meal.idMeal}">
                    <div class="row" class = "meal-img">
                    <div class="card-body" class = "meal-name">

                        <img src = "${meal.strMealThumb}" class="card-img-top" alt = "food"  width ='100'>
                        <h3 class="card-title">${meal.strMeal}</h3>
                        <button type="button" class="btn btn-primary morInfo" data-bs-toggle="modal" data-bs-target="#staticBackdrop">more info</button>
                        
                    </div>
                    </div>
                </div>
            `;

        console.log(data);
    showResult.innerHTML = html;

      });
    }
    return ;


  });}


        filteredTd.push(match)

    console.log(match);
    });
    console.log(CategoryTable);
    console.log(AreaTable);
    console.log(idArrayArea);
    console.log(idArrayArea);
    console.log(filteredTd);



    const allCaregory = [],
    allCategorysId = []

    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    .then(function (response) {
    return response.json();
   })
    .then(function (data) {
    CategoryTable.push(data)
     console.log(data);
     if(data.meals){
       data.meals.forEach((meal) => {
        allCaregory.push(meal.strCategoryidMeal);
       });
       };
       } );
   
       console.log(allCaregory);
       for (let i = 0; i < allcatresult.length; i++) {
       fetch( `https://www.themealdb.com/api/json/v1/1/filter.php?c=${allcatresult[i]}`)
       .then(function (response) {
       return response.json();
       })
       .then(function (data) {
       CategoryTable.push(data)
       console.log(data);
       if(data.meals){
         data.meals.forEach((meal) => {
          allCategorysId.push(meal.strCategoryidMeal);
         });
         };
         } );
         }




    const  allAreaId = []

    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
     .then(function (response) {
     return response.json();
    })
     .then(function (data) {
      AreaTable.push(data)
      console.log(data);
      if(data.meals){
        data.meals.forEach((meal) => {
          allAreaId.push(meal.idMeal);
        });
        };


    });

  })
    for(i = 0 ;i < CategoryTable.length; i++ )

    form.addEventListener("DOMContentLoaded", async function () {
      let lambid = [];
      let moroccoid = [];
      const lamb = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb`
      );
      const resultlamb = await lamb.json();
      resultlamb.meals.forEach((element) => {
        lambid.push(element.idMeal);
      });
      const morocco = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=Moroccan`
      );
      const resultmor = await morocco.json();
      resultmor.meals.forEach((element) => {
        moroccoid.push(element.idMeal);
      });
      let match = lambid.filter(function (e) {
        return moroccoid.indexOf(e) > -1;
      });
      let result = [];
      for (let i = 0; i < match.length; i++) {
        const idfitch = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match[i]}`
        );
        const response = await idfitch.json();
        result.push(response.meals[0]);
      }
      pages(result);
      button(result);
      displayPage(0, result);
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
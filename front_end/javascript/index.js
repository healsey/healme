//loading status
const loader = document.querySelector(".loading");
//Applied Recipe Filters
const appliedFilters = [];
//welcome page
const welcomeButton = document.querySelector(".welcome-button");
const welcomeContainer = document.querySelector("#welcome-page");
//home page
const homePage = document.querySelector(".home-page");
const recipesContainer = document.querySelector("#recipes-container");

welcomeButton.addEventListener("click", () => {
  homePage.style.display = "initial";
  welcomeContainer.style.display = "none";
  recipesFetch();
});

function urlQueryStringGenerator(){
  const health = []
  let diet = null 
  appliedFilters.forEach(condition => {
    //if (condition === "diabetes" || condition === "high-cholesterol" || condition === "hypertension" || condition === "alzheimers") {

      switch(condition){
        case "diabetes":
          diet = "diet=low-carb"
          break;
        case "high-cholesterol":
          diet = "diet=low-fat"
        break;
        case "hypertension":
          diet = "diet=low-sodium"
        break;
        case "alzheimers":
          diet = "diet=balanced"
        break;
        default:
          health.push(`health=${condition}`);
      }
   
  })

  let healthString = health.join("&");

  if (diet && health.length > 0){
    return `${healthString}&${diet}`
  }else if(health.length > 0) {
    return `${healthString}`
  }else {
    return `${diet}`
  }
 
}

//home page
function recipesFetch() {
  console.log('called')
  fetch('http://localhost:3000/recipes')
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
      data.hits.forEach(recipe => {
          displayRecipe(recipe.recipe)
      })
  })
  // displayRecipe(recipe);
  // displayRecipe(recipe);
  // displayRecipe(recipe);
  // displayRecipe(recipe);
  // displayRecipe(recipe);
  // displayRecipe(recipe);
}

function filtersFetch() {
  
  let customUrl = urlQueryStringGenerator()
  console.log(customUrl)
  if (customUrl === "null"){
     recipesFetch()
  }else {

  fetch(`http://localhost:3000/recipes/${customUrl}`)
    .then((resp) => resp.json())
    .then((data) => {
      recipesContainer.innerHTML = ''
      data.hits.forEach((recipe) => {
        displayRecipe(recipe.recipe);
      });
    });
  }
  // displayRecipe(recipe)
  // displayRecipe(recipe)
  // displayRecipe(recipe)
  // displayRecipe(recipe)
  // displayRecipe(recipe)
  // displayRecipe(recipe)
}

function displayRecipe(recipe) {
  const divTag = document.createElement("div");
  divTag.classList.add("col", "mb-4");
  divTag.innerHTML += `
    <div class="card-container">
        <div class="card" >
            <img src="${recipe.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${recipe.label}</h5>
                <p class="card-text">${recipe.healthLabels[0]}</p>
                <button class="btn btn-outline-dark">View Details</button>
            </div>
        </div>
    </div>
    `;
  recipesContainer.append(divTag);

  //const cardContainer = divTag.querySelector('.card-container')
  const detailsBtn = divTag.querySelector("button");
  detailsBtn.addEventListener("click", () => displayRecipeDetail(recipe));
}

//filteration by health condition
const healthConditionDiv = document.querySelector("#health-condition-div");

const healthConditions = [
  "Diabetes",
  "Hypertension",
  "High Cholestrol",
  "Alzheimers",
];
healthConditions.forEach((condition) => {
  createCheckbox(condition, healthConditionDiv);
});

//filteration by allergies
const allergies = [
  "Egg Free",
  "Dairy Free",
  "Fish Free",
  "Gluten Free",
  "Peanut Free",
  "Tree Nuts Free",
  "Lupine Free",
  "Mustard Free",
];
const allergenDiv = document.querySelector("#allergens-div");

allergies.forEach((allergy) => {
  createCheckbox(allergy, allergenDiv);
});

//all api filteration
const apiOptions = [
  "Alcohol-free",
  "Immune-Supportive",
  "Celery-free",
  "Crustcean-free",
  "Fish",
  "FODMAP free",
  "Gluten",
  "Keto",
  "Kidney friendly",
  "Kosher",
  "Low potassium",
  "Lupine-free",
  "Mustard-free",
  "No oil added",
  "No-sugar",
  "Paleo",
  "Peanuts",
  "Pescatarian",
  "Pork-free",
  "Red meat-free",
  "Sesame-free",
  "Shellfish",
  "Soy",
  "Sugar-conscious",
  "Tree Nuts",
  "Vegan",
  "Vegetarian",
  "Wheat-free",
];
const allFilterDiv = document.querySelector("#all-filter-div");
apiOptions.forEach((option) => {
  createCheckbox(option, allFilterDiv);
});

//helper method to create checkbox items
function createCheckbox(name, mainTag) {
  const id = name.toLowerCase().replace(" ", "-");
  const divTag = document.createElement("div");
  divTag.classList.add("form-check");
  divTag.innerHTML = `
        <input class="form-check-input" type="checkbox" value="" id="${id}">
        <label class="form-check-label" for="${id}">
        ${name}
        </label>
    `;
  const input = divTag.querySelector("input");
  input.addEventListener("change", (e) => {
    if (e.target.checked) {
      appliedFilters.push(e.target.id);
      if(mainTag.id === 'health-condition-div'){
        const inputs = mainTag.querySelectorAll('input')
        inputs.forEach(inn => {  
          if(inn.id !== e.target.id ){
          inn.disabled = true
          }
        })
      }
    } else {
      if(mainTag.id === 'health-condition-div'){
        const inputs = mainTag.querySelectorAll('input')
        inputs.forEach(inn => {  
          inn.disabled = false
        })
      }

      appliedFilters.splice(appliedFilters.indexOf(e.target.id), 1);
    }

    filtersFetch();

  });

  
  mainTag.append(divTag);
}

//helper method to display the recipe details
function displayRecipeDetail(recipe) {
  // cardContainer.classList.add('rotate-recipe')
  const image = document.querySelector(".modal-image");
  const title = document.querySelector(".modal-title");
  const ingredientsList = document.querySelector(".ingredients-list");
  const dietLabels = document.querySelector(".diet-labels");
  const healthLabels = document.querySelector(".health-labels");
  const caloriesTag = document.querySelector(".calories");
  const dishTypeTag = document.querySelector(".dishType");

  caloriesTag.innerText = recipe.calories.toFixed(0);
  dishTypeTag.innerText = recipe.dishType;

  image.src = recipe.image;
  title.innerText = recipe.label;

  ingredientsList.innerHTML = "";
  recipe.ingredientLines.forEach((ingr) => {
    const liTag = document.createElement("li");
    liTag.innerText = ingr;
    ingredientsList.append(liTag);
  });

  dietLabels.innerHTML = "";
  recipe.dietLabels.forEach((label) => {
    dietLabels.innerHTML += `<span class="diet-span">* ${label} </span>`;
  });

  healthLabels.innerHTML = "";
  recipe.healthLabels.forEach((label) => {
    healthLabels.innerHTML += `<span class="health-span"><span style="color:green">&#10003;</span> ${label} </span>`;
  });

  $("#recipeModal").modal();
}

//******************* display '+' or '-' next to each filter header **********************

function filterToggler(e) {
  if (e.target.ariaExpanded == "true") {
    e.target.childNodes[1].innerText = "+";
  } else {
    e.target.childNodes[1].innerText = "-";
  }
}

// registratioooon or login
const registerBtn = document.querySelector("#register-btn");

registerBtn.addEventListener("click", (e) => {
  $("#modal-title")[0].innerText = "Register";
  $(".users-name")[0].style.display = "initial";
  $(".users-name")[1].style.display = "initial";
  $("#registration-modal").modal();
});

const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", (e) => {
  $("#modal-title")[0].innerText = "Login";
  $(".users-name")[0].style.display = "none";
  $(".users-name")[1].style.display = "none";
  $("#registration-modal").modal();
});

$("#auth-form")[0].addEventListener("submit", (e) => {
  e.preventDefault();
  if ($("#modal-title")[0].innerText === "Register") {
    // console.log("registration", e.target.email.value);
    registerUser(e.target.name.value, e.target.email.value, e.target.password.value);
  } else {
    console.log("login", e.target.email.value);
    loginUser(e.target.email.value, e.target.password.value)
  }
  e.target.reset()
});

function registerUser(name, email, password) {
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    }),
  })
    .then((response) => response.json())
    .then((obj) => {
      console.log(obj);
    });
}

function loginUser(email, password){
  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  })
    .then((response) => response.json())
    .then((obj) => {
      console.log(obj);
    });
  
}

const healthConditionTag = document.querySelector("#health-condition-filter");
const allergensFilterTag = document.querySelector("#allergens-filter");
const allFilterTag = document.querySelector("#all-filter");

healthConditionTag.addEventListener("click", (e) => filterToggler(e));
healthConditionTag.click(); //open health conditons selection when page initially loads
allergensFilterTag.addEventListener("click", (e) => filterToggler(e));
allFilterTag.addEventListener("click", (e) => filterToggler(e));

const recipe = {
  uri:
    "http://www.edamam.com/ontologies/edamam.owl#recipe_4bb99424e1bbc40d3cd1d891883d6745",
  label: "Frothy Iced Matcha Green Tea Recipe",
  image:
    "https://www.edamam.com/web-img/643/643d4bad9cc21284f7f52b1b9b862848.jpg",
  source: "Serious Eats",
  url:
    "http://www.seriouseats.com/recipes/2016/08/iced-matcha-green-tea-recipe.html",
  shareAs:
    "http://www.edamam.com/recipe/frothy-iced-matcha-green-tea-recipe-4bb99424e1bbc40d3cd1d891883d6745/-/low-sugar",
  yield: 2,
  dietLabels: ["High-Protein", "Low-Fat"],
  healthLabels: [
    "Sugar-Conscious",
    "Vegan",
    "Vegetarian",
    "Peanut-Free",
    "Tree-Nut-Free",
    "Alcohol-Free",
  ],
  cautions: ["Sulfites"],
  ingredientLines: [
    "2 teaspoons (6g) Japanese matcha green tea (see note above)",
    "8 ounces (235ml) cold water",
  ],
  dishtype: "dinner",
  calories: 500,
};

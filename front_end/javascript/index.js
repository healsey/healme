//loading status
const loader = document.querySelector(".loader");
//Applied Recipe Filters
const appliedFilters = [];
//welcome page
const welcomeButton = document.querySelector(".welcome-button");
const welcomeContainer = document.querySelector("#welcome-page");
//home page
const homePage = document.querySelector(".home-page");
const recipesContainer = document.querySelector("#recipes-container");
const savedRecipeDivTag = document.querySelector("#saved-recipes-container");

welcomeButton.addEventListener("click", () => {
  homePage.style.display = "initial";
  welcomeContainer.style.display = "none";
  recipesFetch();
});

//keeps user logged in after page refresh
let current_user = JSON.parse(sessionStorage.getItem("healme_auth"));
//et parsed_user = JSON.parse(current_user);

//console.log(current_user !== null && current_user !== 'null')
if (current_user !== null && current_user !== 'null') {
  //const parsed_user = JSON.parse(current_user);
  navbarUpdateLoggedInStatus(current_user.user.name);
}

function urlQueryStringGenerator() {
  const health = [];
  let diet = null;
  appliedFilters.forEach((condition) => {
    switch (condition) {
      case "diabetes":
        diet = "diet=low-carb";
        break;
      case "high-cholesterol":
        diet = "diet=low-fat";
        break;
      case "hypertension":
        diet = "diet=low-sodium";
        break;
      case "alzheimers":
        diet = "diet=balanced";
        break;
      default:
        health.push(`health=${condition}`);
    }
  });

  let healthString = health.join("&");

  if (diet && health.length > 0) {
    return `${healthString}&${diet}`;
  } else if (health.length > 0) {
    return `${healthString}`;
  } else {
    return `${diet}`;
  }
}

//home page
function recipesFetch() {
  recipesContainer.innerHTML = ""
  loader.style.display = "initial";
  fetch("http://localhost:3000/recipes")
    .then((resp) => resp.json())
    .then((data) => {
      data.hits.forEach((recipe) => {
        displayRecipe(recipe.recipe, false);
        loader.style.display = "none";
      });
    });
  // displayRecipe(recipe, false);
  // displayRecipe(recipe, false);
  // displayRecipe(recipe, false);
  // displayRecipe(recipe, false);
  // displayRecipe(recipe, false);
  // displayRecipe(recipe, false);
}

function filtersFetch(search_term='null') {
  recipesContainer.innerHTML = ''; //recently added 
  loader.style.display = "initial";
  
  let customUrl = urlQueryStringGenerator();

  if (customUrl === "null" && search_term == 'null') {
    recipesFetch();
  } else  {
    fetch(`http://localhost:3000/recipes/${customUrl}/${search_term}`)
      .then((resp) => resp.json())
      .then((data) => {
        recipesContainer.innerHTML = "";
        data.hits.forEach((recipe) => {
          displayRecipe(recipe.recipe, false);
          loader.style.display = "none";
        });
      });
  }
  // displayRecipe(recipe, false);
  // displayRecipe(recipe, false);
  // displayRecipe(recipe, false);
  // displayRecipe(recipe, false);
  // displayRecipe(recipe, false);
  // displayRecipe(recipe, false);
}

function displayRecipe(recipe, isSaved) {
  let heart = "🤍";
  let spanClass = "white";
  if (isSaved) {
    heart = "❤️";
    spanClass = "red";
  }
  const divTag = document.createElement("div");
  divTag.classList.add("col", "mb-4");
  divTag.innerHTML += `
    <div class="card-container">
    <div class="card" >
        <div class="image">
            <img src="${recipe.image}" class="card-img-top" alt="...">
             <button class="favorite">
            <span class="${spanClass}">${heart}</span>
          </button>
          </div>
            <div class="card-body">
                <h5 class="card-title">${recipe.label}</h5>
                <p class="card-text">${recipe.healthLabels[0]}</p>
                <button class="btn btn-outline-dark">View Details</button>
            </div>
        </div>
    </div>
    `;

    const divTagCopy = divTag.cloneNode(true);
    divTagCopy.querySelector('span').innerText = "❤️"
    divTagCopy.querySelector('span').className = "red"
   
    const favoriteBtnCopy = divTagCopy.querySelector(".favorite");
    const favSpanCopy = divTagCopy.querySelector("span");
    const favSpan = divTag.querySelector("span");
    const favoriteBtn = divTag.querySelector(".favorite");

  if (isSaved == false) {
    const detailsBtn = divTag.querySelector(".btn");
    detailsBtn.addEventListener("click", () => displayRecipeDetail(recipe));
    favBtnListener(recipe,favoriteBtn, divTagCopy, favSpan);
    recipesContainer.append(divTag);
  } else {
    savedRecipeDivTag.append(divTagCopy);
  }
  const detailsBtnCopy = divTagCopy.querySelector(".btn");
  detailsBtnCopy.addEventListener("click", () => displayRecipeDetail(recipe));
  favBtnListener(recipe, favoriteBtnCopy, divTagCopy, favSpanCopy, favSpan)
}


function favBtnListener(recipe, favoriteBtn, divTag, favSpan, originalSpan=null) {
  favoriteBtn.addEventListener("click", (e) => {
    if(current_user == null || current_user == 'null'){
      $("#modal-title")[0].innerText = "Login";
      $(".users-name")[0].style.display = "none";
      $(".users-name")[1].style.display = "none";
      $("#registration-modal").modal();
    }else {
      if (favSpan.className === "white") {
        //console.log(favSpan)
        favSpan.innerText = "❤️";
        favSpan.className = "red";
        savedRecipeDivTag.append(divTag);
        saveRecipe(recipe);
      } else {
        favSpan.innerText = "🤍";
        favSpan.className = "white";
        divTag.remove();
        if(originalSpan !== null){
          console.log("called originalspan", originalSpan)
          originalSpan.innerText = "🤍"
          originalSpan.className = "white";
        }
        deleteRecipe(recipe.uri)
      }
    }

  });
}

function saveRecipe(recipe) {
  fetch("http://localhost:3000/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      metadata: recipe,
      uri: recipe.uri,
      user_id: current_user.user.id,
    }),
  })
    .then((resp) => resp.json())
    .then((obj) => {
       retrieveSavedRecipes()
       $('#create-recipe-modal').modal('hide')
    });
}

function deleteRecipe(recipe_uri) {
  fetch('http://localhost:3000/recipes', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      uri: recipe_uri,
      user_id: current_user.user.id,
    })
  }).then(resp => resp.json())
    .then(obj => {
      console.log("deleted", obj);
    });
}

//filteration by health condition
const healthConditionDiv = document.querySelector("#health-condition-div");

const healthConditions = [
  "Diabetes",
  "Hypertension",
  "High Cholesterol",
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
  "Immuno-Supportive",
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
        <input class="form-check-input" name="checkbox" type="checkbox" value="" id="${id}">
        <label class="form-check-label" for="${id}">
        ${name}
        </label>
    `;
  const input = divTag.querySelector("input");
  input.addEventListener("change", (e) => {
    if (e.target.checked) {
      appliedFilters.push(e.target.id);
      if (mainTag.id === "health-condition-div") {
        const inputs = mainTag.querySelectorAll("input");
        inputs.forEach((inn) => {
          if (inn.id !== e.target.id) {
            inn.disabled = true;
          }
        });
      }
    } else {
      if (mainTag.id === "health-condition-div") {
        const inputs = mainTag.querySelectorAll("input");
        inputs.forEach((inn) => {
          inn.disabled = false;
        });
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
    registerUser(
      e.target.name.value,
      e.target.email.value,
      e.target.password.value
    );
  } else {
    loginUser(e.target.email.value, e.target.password.value);
  }
  e.target.reset();
  $("#registration-modal").modal("hide");
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
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((obj) => {
      if (obj.error) {
        //display the error to the user
      } else {
        sessionStorage.setItem("healme_auth", JSON.stringify(obj));
        navbarUpdateLoggedInStatus(obj.user.name);
        //added this on morning of demo 
        current_user = obj;
        recipesFetch()
      }
    });
}
const loggoutBtn = document.querySelector("#logout-btn");
loggoutBtn.addEventListener("click", (e) => {
  logoutUser();
});
function logoutUser() {
  sessionStorage.setItem("healme_auth", null);
  document
    .querySelectorAll(".user-loggedin")
    .forEach((elem) => (elem.style.display = "none"));
  document
    .querySelectorAll(".user-loggedout")
    .forEach((elem) => (elem.style.display = "initial"));

    current_user = null;
    recipesFetch()
}

function loginUser(email, password) {
  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((obj) => {
      if (obj.error) {
        //display the error to the user
      } else {
        // console.log(obj, 'logged user info');
        sessionStorage.setItem("healme_auth", JSON.stringify(obj));
        navbarUpdateLoggedInStatus(obj.user.name);
        current_user = obj;
        recipesFetch()
      }
    });
}

function navbarUpdateLoggedInStatus(user_name) {
  document
    .querySelectorAll(".user-loggedin")
    .forEach((elem) => (elem.style.display = "initial"));
  document
    .querySelectorAll(".user-loggedout")
    .forEach((elem) => (elem.style.display = "none"));
  document.querySelector("#user-name-btn").innerText = `Hello ${user_name}`;
}

$("#saved-recipes-btn").click((e) => {
  $("#recipes-container").hide();

  retrieveSavedRecipes();

  $("#saved-recipes-container").show();
});

$("#logo").click((e) => {
  $("#recipes-container").show();
  $("#saved-recipes-container").hide();
});

function retrieveSavedRecipes() {
  savedRecipeDivTag.innerHTML = ''
  fetch("http://localhost:3000/recipes/saved_recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      user_id: current_user.user.id,
    }),
  })
    .then((resp) => resp.json())
    .then((obj) => {
      obj.forEach((data) => {
        displayRecipe(data.metadata, true);
      });
    });
}

const healthConditionTag = document.querySelector("#health-condition-filter");
const allergensFilterTag = document.querySelector("#allergens-filter");
const allFilterTag = document.querySelector("#all-filter");

healthConditionTag.addEventListener("click", (e) => filterToggler(e));
healthConditionTag.click(); //open health conditons selection when page initially loads
allergensFilterTag.addEventListener("click", (e) => filterToggler(e));
allFilterTag.addEventListener("click", (e) => filterToggler(e));




// **************** Handling Search Functionality *********************
const searchForm = document.querySelector('#search-form')
searchForm.addEventListener('submit', e => {
  e.preventDefault()
  filtersFetch(e.target.search.value)
})


// ******************** Create Recipe *******************************
const addIngredientBtn = document.querySelector('#add-ingredient')
const ingredientsCreateRecipeDiv = document.querySelector('#ingredients-create-recipe')
addIngredientBtn.addEventListener('click', e => {
  ingredientsCreateRecipeDiv.innerHTML += `<input name="ingredients" type="name" class="form-control recipe-name" id="recipe-name">`
})
const createRecipeBtn = document.querySelector('#create-recipe-btn')
createRecipeBtn.addEventListener('click', e => {
  const healthLabelRecipeCreation = document.querySelector('#health-labels-create-recipe') 
  const dietLabelRecipeCreation = document.querySelector('#diet-labels-create-recipe')

  healthLabelRecipeCreation.innerHTML = ''
  dietLabelRecipeCreation.innerHTML = ''
  healthLabelsOptions.forEach(option => {
    newRecipeCheckbox(option, healthLabelRecipeCreation)
  })

dietLabels.forEach(option => {
  newRecipeCheckbox(option, dietLabelRecipeCreation)
})
  
  $('#create-recipe-modal').modal()
})



const createRecipeForm = document.querySelector('#create-recipe-form')
createRecipeForm.addEventListener('submit', e => {
  e.preventDefault()
  const recipeName = e.target.recipeName.value
  const imageLink = e.target.image.value
  const healthLabelsArray = []
  const dietLabelsArray = []
  const ingredientArray = []

  // console.log(e.target.querySelector('#health-labels-create-recipe'))
  e.target.querySelector('#health-labels-create-recipe').childNodes.forEach(inn => {
    if(inn.querySelector('input').checked){
      healthLabelsArray.push(inn.querySelector('input').id)
    }
  })

  e.target.querySelector('#diet-labels-create-recipe').childNodes.forEach(inn => {
    if(inn.querySelector('input').checked){
      dietLabelsArray.push(inn.querySelector('input').id)
    }
  })
  
  e.target.querySelector('#ingredients-create-recipe').childNodes.forEach(inn => {
    console.log(inn.value)
    ingredientArray.push(inn.value)
  })
  
  const finalRecipe = {
    uri: imageLink,
    label: recipeName,
    image: imageLink,
    dietLabels: dietLabelsArray,
    healthLabels: healthLabelsArray,
    ingredientLines: ingredientArray,
    calories: 175
  }

  saveRecipe(finalRecipe)
})



function newRecipeCheckbox(name, mainTag) {
  const id = name.toLowerCase().replace(" ", "-");
  const divTag = document.createElement("div");
  divTag.classList.add("form-check");
  divTag.innerHTML = `
        <input class="form-check-input" name="checkbox" type="checkbox" value="" id="${id}">
        <label class="form-check-label" for="${id}">
        ${name}
        </label>
    `;

  mainTag.append(divTag);
}


const healthLabelsOptions = [
  "Sugar-Conscious",
  "Vegan",
  "Vegetarian",
  "Peanut-Free",
  "Tree-Nut-Free",
  "Alcohol-Free",
]

const dietLabels = ["High-Protein", "Low-Fat", "Low-Sodium", "Low-Carb"]

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





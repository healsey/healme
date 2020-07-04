//welcome page 
const welcomeButton = document.querySelector('.welcome-button')
const welcomeContainer = document.querySelector('#welcome-page')
//home page
const homePage = document.querySelector('.home-page')
const recipesContainer = document.querySelector('#recipes-container')

welcomeButton.addEventListener('click', () => {
    homePage.style.display = 'initial'
    welcomeContainer.style.display = 'none'
    recipesFetch()
})


//home page
function recipesFetch(){
    // fetch('http://localhost:3000/health_conditions')
    // .then(resp => resp.json())
    // .then(data => {
    //     console.log(data)
    // })
    displayRecipe(recipe)
    displayRecipe(recipe)
    displayRecipe(recipe)
    displayRecipe(recipe)
    displayRecipe(recipe)
    displayRecipe(recipe)
}



function displayRecipe(recipe){
    const divTag = document.createElement('div')
    divTag.classList.add('col', 'mb-4')
    divTag.innerHTML += `
        <div class="card" >
            <img src="${recipe.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${recipe.label}</h5>
                <p class="card-text">Sugar-Concious</p>
                <a class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `
    recipesContainer.append(divTag)
}

//filteration by health condition 

const healthConditionDiv = document.querySelector('#health-condition-div')

const healthConditions = ["Diabetes", "Hypertension", "High Cholestrol", "Alzheimers"]
healthConditions.forEach(condition => {
    createCheckbox(condition, healthConditionDiv)
})

const healthConditionTag = document.querySelector("#health-condition-filter")
healthConditionTag.click()  //open health conditons selection when page initially loads 




//filteration by allergies 
const allergies = ["Eggs", "Dairy", "Fish", "Gluten", "Peanuts", "Tree Nuts", "Lupine", "Mustard"]
const allergenDiv = document.querySelector('#allergens-div')

allergies.forEach(allergy => {
    createCheckbox(allergy, allergenDiv)
})




//all api filteration
const apiOptions = ["Balanced", "High-Fiber", "High-Protein", "Low-Carb", "Low-Fat", "Low-Sodium", "Alcohol-free", "Immune-Supportive", "Celery-free","Crustcean-free","Dairy","Eggs","Fish","FODMAP free","Gluten","Keto","Kidney friendly","Kosher","Low potassium","Lupine-free","Mustard-free","No oil added","No-sugar","Paleo","Peanuts","Pescatarian","Pork-free","Red meat-free","Sesame-free","Shellfish","Soy","Sugar-conscious","Tree Nuts","Vegan","Vegetarian","Wheat-free"]
const allFilterDiv = document.querySelector('#all-filter-div')
apiOptions.forEach(option => {
    createCheckbox(option, allFilterDiv)
})




//helper method to create checkbox items 
function createCheckbox(name, mainTag){
    const id = name.toLowerCase().replace(" ", "-")
    const divTag = document.createElement('div')
    divTag.classList.add("form-check")
    divTag.innerHTML = `
        <input class="form-check-input" type="checkbox" value="" id="${id}">
        <label class="form-check-label" for="${id}">
        ${name}
        </label>
    `
    const input = divTag.querySelector('input')
    input.addEventListener("change", (e) => {
        if (e.target.checked){
        
        } else {

        }
        //console.log(e.target.id)
    })

    mainTag.append(divTag)
}

const recipe = {
    "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_4bb99424e1bbc40d3cd1d891883d6745",
    "label": "Frothy Iced Matcha Green Tea Recipe",
    "image": "https://www.edamam.com/web-img/643/643d4bad9cc21284f7f52b1b9b862848.jpg",
    "source": "Serious Eats",
    "url": "http://www.seriouseats.com/recipes/2016/08/iced-matcha-green-tea-recipe.html",
    "shareAs": "http://www.edamam.com/recipe/frothy-iced-matcha-green-tea-recipe-4bb99424e1bbc40d3cd1d891883d6745/-/low-sugar",
    "yield": 2,
    "dietLabels": [
    "High-Protein",
    "Low-Fat"
    ],
    "healthLabels": [
    "Sugar-Conscious",
    "Vegan",
    "Vegetarian",
    "Peanut-Free",
    "Tree-Nut-Free",
    "Alcohol-Free"
    ],
    "cautions": [
    "Sulfites"
    ],
    "ingredientLines": [
    "2 teaspoons (6g) Japanese matcha green tea (see note above)",
    "8 ounces (235ml) cold water"
    ]}


 
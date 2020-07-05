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
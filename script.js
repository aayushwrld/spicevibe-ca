const genMealBtn = document.getElementById('gen-meal');
const redoIcon = document.getElementById('redo-icon');
const exploreScroll = document.getElementById('explore-btn');
const homeScroll = document.getElementById('home-btn');
const footHomeBtn = document.getElementById('footer-home');
const footExploreBtn = document.getElementById('footer-explore');
const footRandomBtn = document.getElementById('footer-random');
const generateNewRandom = document.getElementById('gen-meal');
const food = document.querySelector('.meal-gen-food-border');
const searchBtn = document.getElementById('search-btn');
const resultDiv = document.querySelector('.meal-results-area');
const loadSearch = document.querySelector('.for-search');
let mealSearchText = document.getElementById('meal-search-info3');
let resultDishName = document.getElementById('meal-gen-result-name');
let resultDishImg = document.getElementById('meal-result-img')
let randomMealImg = document.getElementById('meal-random-img');
let randomMealName = document.getElementById('meal-gen-food-name');
let modal = document.getElementById('modal');
let modalCloseBtn = document.getElementById('modal-close');
let modalMeal = document.getElementById('modal-meal-name');
let modalImg = document.getElementById('modal-meal-img');
let instructions = document.getElementById('li-instructions');
let youtubeVid = document.getElementById('youtube-link');
let modalRight = document.querySelector('.modal-content-right');

resultDiv.style.overflowX = 'hidden';

let rotation = 0;
genMealBtn.addEventListener('click', function () {
    rotation += 360;
    redoIcon.style.transform = `rotate(${rotation}deg)`;
});

homeScroll.addEventListener('click', function () {
    if (modal.style.visibility = 'visible') {
        modal.style.visibility = 'hidden'
        document.body.style.overflow = 'auto';
        var scrollAmount = window.innerHeight * 0;
        window.scrollTo({
            top: scrollAmount,
            behavior: 'smooth'
        });
    }
});

footHomeBtn.addEventListener('click', function () {
    var scrollAmount = window.innerHeight * 0;
    window.scrollTo({
        top: scrollAmount,
        behavior: 'smooth'
    });
});

footExploreBtn.addEventListener('click', function () {
    var scrollAmount = window.innerHeight * 0.85;
    window.scrollTo({
        top: scrollAmount,
        behavior: 'smooth'
    });
});

footRandomBtn.addEventListener('click', function () {
    var scrollAmount = window.innerHeight * 0.88;
    window.scrollTo({
        top: scrollAmount,
        behavior: 'smooth'
    });
});

exploreScroll.addEventListener('click', function () {
    if (modal.style.visibility = 'visible') {
        modal.style.visibility = 'hidden'
        document.body.style.overflow = 'auto';
        var scrollAmount = window.innerHeight * 0.85;
        window.scrollTo({
            top: scrollAmount,
            behavior: 'smooth'
        });
    }
});


const randomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

generateNewRandom.addEventListener('click', getRandom);

document.addEventListener('DOMContentLoaded', getRandom)

let newMeal;
let newImg;
let temp;
const loading = document.getElementById('meal-loading');
function getRandom() {
    loading.style.display = 'flex';
    food.style.pointerEvents = 'none';
    randomMealImg.style.visibility = 'hidden';
    randomMealName.style.visibility = 'hidden';
    fetch(randomUrl)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            temp = data;
            loading.style.display = 'flex';
            newMeal = data.meals['0'].strMeal;
            newImg = data.meals['0'].strMealThumb;
            addInModal(data)
            setTimeout(() => {
                randomMealImg.setAttribute('src', newImg);
                randomMealName.textContent = newMeal;
            }, 500)
            randomMealImg.addEventListener("load", () => {
                loading.style.display = 'none';
                food.style.pointerEvents = 'auto'
                randomMealName.style.visibility = 'visible';
                randomMealImg.style.visibility = 'visible';
            })
        })
        .catch((er) => {
            console.log(er)
        })
}

food.addEventListener('click', () => {
    loadSearch.style.visibility = "visible";
    setTimeout(() => {
        loadSearch.style.visibility = "hidden";
    }, 1000)
    document.body.style.overflow = 'hidden';
    modal.style.visibility = 'visible';
    addInModal(temp)

})

modalCloseBtn.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    modal.style.visibility = 'hidden'
})
function addInModal(str) {
    newMeal = str.meals['0'].strMeal;
    newImg = str.meals['0'].strMealThumb;
    modalMeal.textContent = newMeal;
    modalImg.setAttribute('src', newImg);
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        let ingKey = `strIngredient${i}`
        let keyCall = str.meals['0'][ingKey];
        if (keyCall != '' && keyCall != null) {
            ingredients.push(keyCall);
        }
    }

    let ingredientsList = document.getElementById("ul-ingredients");
    let ingredientCode = '';
    for (let j = 0; j < ingredients.length; j++) {
        let ingredientAdd = ingredients[j];
        ingredientCode += `<li id="li-ingredient">
                            <img src="https://www.themealdb.com/images/ingredients/${ingredientAdd}-Small.png" alt="" id="ingredient-img">
                            <span id="ingredient-name">${ingredientAdd}</span>
                            </li>`
    }
    ingredientsList.innerHTML = ingredientCode;
    let instructionCall = str.meals['0'].strInstructions;
    instructions.innerText = instructionCall;
    let youtubeLink = str.meals['0'].strYoutube;
    youtubeVid.setAttribute('href', youtubeLink)
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        let searchingCat = searchInput.value.trim();
        searchResult(searchingCat)
    }
})

searchBtn.addEventListener('click', () => {
    let searchingCat = searchInput.value.trim();
    searchResult(searchingCat)
})

function searchResult(category) {
    let catLink = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    fetch(catLink)
        .then((result) => {
            return result.json()
        })
        .then((info) => {

            let resulting = '';
            for (let i = 0; i < info.meals.length; i++) {
                resulting += `<div class="meal-results-food-border">
            <div class="meal-result-food-img">
                <img src="${info.meals[`${i}`].strMealThumb}" alt="" id="meal-result-img">
                <p class = "${info.meals[`${i}`].idMeal}" id = "id-meal"></p>
            </div>
            <div class="meal-gen-result-dish">
                <span id="meal-gen-result-name">${info.meals[`${i}`].strMeal}</span>
            </div>
        </div>`
            }
            resultDiv.style.overflowX = 'auto';
            resultDiv.innerHTML = resulting;
            mealSearchText.textContent = `You searched for - ${category}`
            mealSearchText.style.color = "white";
            let mealResultsFood = document.querySelectorAll('.meal-results-food-border');
            let elementID;
            mealResultsFood.forEach(element => {
                element.addEventListener('click', () => {
                    let paragraph = element.querySelector('p');
                    if (paragraph) {
                        elementID = paragraph.className;
                    }
                    let idUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${elementID}`

                    fetch(idUrl)
                        .then((result) => {
                            return result.json()
                        })
                        .then((data2) => {
                            addInModal(data2)
                        }).catch((err) => {
                            console.log(err)
                        })
                    modal.style.visibility = 'visible';
                    document.body.style.overflow = 'hidden';
                    loadSearch.style.visibility = "visible";
                    setTimeout(() => {
                        loadSearch.style.visibility = "hidden";
                    }, 1000)
                });
            });
        })
        .catch((er) => {
            resulting = '';
            resultDiv.innerHTML = resulting;
            console.log(er)
            mealSearchText.textContent = "Invalid Search"
            mealSearchText.style.color = "red";
        })
}


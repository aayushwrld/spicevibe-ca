
// defining all necessary variables
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
let newMeal;
let newImg;
let temp;

//defining the loading effect div
const loading = document.getElementById('meal-loading');

// defining the api url for generating random meals
const randomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

// hiding the scrollbar of the results div
resultDiv.style.overflowX = 'hidden';

//syntax for rotation effect of generate meals icon
let rotation = 0;
genMealBtn.addEventListener('click', function () {
    rotation += 360;
    redoIcon.style.transform = `rotate(${rotation}deg)`;
});

// adding event listener to home button, when clicked it will scroll up to the top
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

// adding event listener to home option in the footer, when clicked it will scroll up to the top
footHomeBtn.addEventListener('click', function () {
    var scrollAmount = window.innerHeight * 0;
    window.scrollTo({
        top: scrollAmount,
        behavior: 'smooth'
    });
});

// adding event listener to explore option in the footer, when clicked it will scroll up to the meals section
footExploreBtn.addEventListener('click', function () {
    var scrollAmount = window.innerHeight * 0.85;
    window.scrollTo({
        top: scrollAmount,
        behavior: 'smooth'
    });
});

// adding event listener to Random option in the footer, when clicked it will scroll up to the random meals section
footRandomBtn.addEventListener('click', function () {
    var scrollAmount = window.innerHeight * 0.88;
    window.scrollTo({
        top: scrollAmount,
        behavior: 'smooth'
    });
});

// adding event listener to Explore option in the nav, when clicked it will scroll up to the meals section
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

//event listener to the button, when it will be clicked getRandom function will run
generateNewRandom.addEventListener('click', getRandom);

//event listener for on loading of the website, the getRandom function will run
document.addEventListener('DOMContentLoaded', getRandom);

// event listener such that on clicking the random meal generated, modal loads up
food.addEventListener('click', () => {
    loadSearch.style.visibility = "visible";
    loadSearch.style.borderRadius = "0px";
    setTimeout(() => {
        loadSearch.style.visibility = "hidden";
        loadSearch.style.borderRadius = "20px";
    }, 1000)

    //hiding overflow to prevent from scrolling when modal is up
    document.body.style.overflow = 'hidden';
    modal.style.visibility = 'visible';
    addInModal(temp)
})

// event listener for close button of the modal
modalCloseBtn.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    modal.style.visibility = 'hidden'
})

// event listener for clicking enter, the input category will be searched
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        let searchingCat = searchInput.value.trim();
        searchResult(searchingCat)
    }
})

// event listener for clicking the button, the input category will be searched
searchBtn.addEventListener('click', () => {
    let searchingCat = searchInput.value.trim();
    searchResult(searchingCat)
})

// all the functions for the website

//getRandom function to get details from the randomUrl API
function getRandom() {

    //changing styles for effects of loading
    loading.style.display = 'flex';
    food.style.pointerEvents = 'none';
    randomMealImg.style.visibility = 'hidden';
    randomMealName.style.visibility = 'hidden';

    //fetching randomUrl
    fetch(randomUrl)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            temp = data;
            loading.style.display = 'flex';
            newMeal = data.meals['0'].strMeal;
            newImg = data.meals['0'].strMealThumb;
            //running addInModal function to update modal Data
            addInModal(data)

            //giving timeout to setting the image for load effect
            setTimeout(() => {
                randomMealImg.setAttribute('src', newImg);
                randomMealName.textContent = newMeal;
            }, 500)

            //adding event such that on load of the image fully, the content will be visible
            randomMealImg.addEventListener("load", () => {
                loading.style.display = 'none';
                food.style.pointerEvents = 'auto'
                randomMealName.style.visibility = 'visible';
                randomMealImg.style.visibility = 'visible';
            })
        })

        //consoling error if API does not load.
        .catch((er) => {
            console.log(er)
            randomMealName.textContent = "There was an error loading, kindly reload or generate a new meal! :)";
        })
}



// function for adding content to the modal
function addInModal(str) {

    //setting names in the modal
    newMeal = str.meals['0'].strMeal;
    newImg = str.meals['0'].strMealThumb;
    modalMeal.textContent = newMeal;
    modalImg.setAttribute('src', newImg);
    
    // going through the ingredients in API and pushing in a list
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        let ingKey = `strIngredient${i}`
        let keyCall = str.meals['0'][ingKey];
        if (keyCall != '' && keyCall != null) {
            ingredients.push(keyCall);
        }
    }

    // adding ingredients to the modal
    let ingredientsList = document.getElementById("ul-ingredients");
    let ingredientCode = '';

    // adding innerHTML to the website in the ingredients div, so all ingredients are visible
    for (let j = 0; j < ingredients.length; j++) {
        let ingredientAdd = ingredients[j];
        ingredientCode += `<li id="li-ingredient">
                            <img src="https://www.themealdb.com/images/ingredients/${ingredientAdd}-Small.png" alt="" id="ingredient-img">
                            <span id="ingredient-name">${ingredientAdd}</span>
                            </li>`
    }
    ingredientsList.innerHTML = ingredientCode;

    //adding instructions to the modal from API
    let instructionCall = str.meals['0'].strInstructions;
    instructions.innerText = instructionCall;

    //adding the youtube link from API to code
    let youtubeLink = str.meals['0'].strYoutube;
    youtubeVid.setAttribute('href', youtubeLink)
}

// function for details of meals that came in category 
function searchResult(category) {

    // gave category as the parameter to make it easy to load up the site
    let catLink = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`

    // fetching the API of the link
    fetch(catLink)
        .then((result) => {
            return result.json()
        })
        .then((info) => {

            // a string in which all the code for the meals searched will be
            let resulting = '';

            // giving loop for the no. of meals in the category to get added in the code string
            for (let i = 0; i < info.meals.length; i++) {

                // code for the string which will be pushed as inner html 
                // giving id of the meal as id to an empty p tag so that it can be fetched by search by ID API
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

            // adding overflow so that, the div can be scrolled if there is no space for all meals
            resultDiv.style.overflowX = 'auto';

            // pushing the string to innerHTML of result div
            resultDiv.innerHTML = resulting;

            // changing some contents of webpge
            mealSearchText.textContent = `You searched for - ${category}`
            mealSearchText.style.color = "white";

            // syntax for calling the ID stored in the p tag previously and changing content of modal accordingly
            let mealResultsFood = document.querySelectorAll('.meal-results-food-border');
            let elementID;

            // going through all the meal classes and returning the ID of the meal
            mealResultsFood.forEach(element => {
                element.addEventListener('click', () => {
                    let paragraph = element.querySelector('p');
                    if (paragraph) {
                        elementID = paragraph.className;
                    }

                    // running API of fetching data of meal from ID
                    let idUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${elementID}`

                    // fetching the API of link
                    axios.get(idUrl)
                        .then((data2) => {

                            // running addInModal function and changing content accordingly
                            addInModal(data2.data)
                        }).catch((err) => {
                            console.log(err)
                        })
                    
                    modal.style.visibility = 'visible';
                    document.body.style.overflow = 'hidden';
                    loadSearch.style.borderRadius = "0px";
                    loadSearch.style.visibility = "visible";

                    // setting timeout of 1s for loading effect
                    setTimeout(() => {
                        loadSearch.style.visibility = "hidden";
                        loadSearch.style.borderRadius = "20px";
                    }, 1000)
                });
            });
        })

        // catching error (if the searched category is not valid), some text content guiding the user will be changed
        .catch((er) => {
            resulting = '';
            resultDiv.innerHTML = resulting;
            console.log("This is not an error, the search was invalid, hence returning an error.")
            mealSearchText.textContent = "Invalid Search"
            mealSearchText.style.color = "red";
        })
}
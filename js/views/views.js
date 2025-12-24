let selectedIngredients = [];

function setupUI() {
    setupIngredientSelection();
    setupIngredientSearch();
    setupFindButton();
    loadDrinkOfTheDay();
    loadPopularCocktails();
}

function setupIngredientSelection() {
    let items = document.querySelectorAll(".ingredient-item");

    for (let i = 0; i < items.length; i++) {
        let item = items[i];

        item.addEventListener("click", function () {
            let name = item.textContent.trim();
            let index = selectedIngredients.indexOf(name);

            if (index === -1) {
                selectedIngredients.push(name);
                item.classList.add("selected");
            } else {
                selectedIngredients.splice(index, 1);
                item.classList.remove("selected");
            }

            console.log("Selected ingredients:", selectedIngredients);
        });
    }
}

function setupIngredientSearch() {
    let searchInput = document.querySelector(".ingredient-search");
    if (!searchInput) return;

    let items = document.querySelectorAll(".ingredient-item");

    searchInput.addEventListener("input", function () {
        let query = searchInput.value.toLowerCase();

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let text = item.textContent.toLowerCase();

            if (text.indexOf(query) !== -1) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        }
    });
}

function setupFindButton() {
    let btn = document.querySelector(".find-button");
    if (!btn) {
        console.error("Find Cocktails button not found");
        return;
    }

    btn.addEventListener("click", async function () {
        console.log("Find Cocktails clicked");
        console.log("Using ingredients:", selectedIngredients);

        let resultsContainer = document.getElementById("cocktailResults");
        if (resultsContainer) {
            resultsContainer.innerHTML = "Loading...";
        }

        try {
            let drinks = await getCocktailList(selectedIngredients);
            console.log("Cocktails from multiIngredient:", drinks);
            populateCocktails(drinks);
        } catch (e) {
            console.error("Error loading cocktails:", e);
            if (resultsContainer) {
                resultsContainer.textContent = "Something went wrong. Please try again.";
            }
        }
    });
}

async function loadDrinkOfTheDay() {
    const today = new Date().toISOString().slice(0, 10);
    const stored = localStorage.getItem("drinkOfTheDay");
    if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === today && parsed.drink) {
            populateDrinkOfTheDay(parsed.drink);
            return;
        }
    }
    try {
        const randomDrink = await getRandomCocktail();
        if (randomDrink) {
            populateDrinkOfTheDay(randomDrink);
            const toStore = {
                date: today,
                drink: randomDrink
            };
            localStorage.setItem("drinkOfTheDay", JSON.stringify(toStore));
        }
    } catch (e) {
        console.error("Error loading drink of the day:", e);
    }
}

function populateDrinkOfTheDay(drink) {
    if (!drink) return;

    let nameEl = document.querySelector(".drink-name");
    let imgEl = document.querySelector(".drink-image");
    let ingredientsList = document.querySelector(".ingredients-list");

    let name =
        drink.strDrink ||
        "Unknown Cocktail";

    let imgSrc =
        drink.strDrinkThumb ||
        "https://via.placeholder.com/300x300.png?text=Cocktail";

    if (nameEl) {
        nameEl.textContent = name;
    }
    if (imgEl) {
        imgEl.src = imgSrc;
        imgEl.alt = name;
    }
    if (ingredientsList) {
        ingredientsList.innerHTML = "";

        let hasIngredients = false;
        for (let i = 1; i <= 15; i++) {
            let ing = drink["strIngredient" + i];
            let measure = drink["strMeasure" + i];

            if (ing && ing.trim() !== "") {
                hasIngredients = true;
                let li = document.createElement("li");
                li.textContent = (measure ? measure.trim() + " " : "") + ing.trim();
                ingredientsList.appendChild(li);
            }
        }

        if (!hasIngredients && drink.ingredients && Array.isArray(drink.ingredients)) {
            for (let i = 0; i < drink.ingredients.length; i++) {
                let li = document.createElement("li");
                li.textContent = drink.ingredients[i];
                ingredientsList.appendChild(li);
            }
        }
    }
}

async function fillRecipeOnBack(drink, ingredientsList, instructionsPara) {
    if (!drink._detailsLoaded && drink.idDrink) {
        try {
            let full = await getCocktail(drink.idDrink);
            if (full) {
                drink = Object.assign(drink, full);
            }
        } catch (e) {
            console.error("Error loading full recipe:", e);
        }
        drink._detailsLoaded = true;
    }

    ingredientsList.innerHTML = "";
    let hasIngredients = false;

    for (let j = 1; j <= 15; j++) {
        let ing = drink["strIngredient" + j];
        let measure = drink["strMeasure" + j];

        if (ing && ing.trim() !== "") {
            hasIngredients = true;
            let li = document.createElement("li");
            li.textContent = (measure ? measure.trim() + " " : "") + ing.trim();
            ingredientsList.appendChild(li);
        }
    }

    if (!hasIngredients) {
        let li = document.createElement("li");
        li.textContent = "Ingredients not available.";
        ingredientsList.appendChild(li);
    }

    if (drink.strInstructions) {
        instructionsPara.textContent = drink.strInstructions;
    } else {
        instructionsPara.textContent = "Instructions not available.";
    }
}
function populateCocktails(drinks) {
    let container = document.getElementById("cocktailResults");
    if (!container) return;
    container.innerHTML = "";
    if (!drinks || drinks.length === 0) {
        container.textContent = "No cocktails found. Try different ingredients!";
        return;
    }

    let validDrinks = [];
    for (let i = 0; i < drinks.length; i++) {
        let d = drinks[i];
        if (!d) continue;

        let name = d.strDrink || d.name || d.drinkName;
        if (name && name.trim() !== "") {
            validDrinks.push(d);
        }
    }

    if (validDrinks.length === 0) {
        container.textContent = "No cocktails found for those ingredients.";
        return;
    }

    console.log("Cocktails you can make - sample valid drink:", validDrinks[0]);
    for (let i = 0; i < validDrinks.length; i++) {
        let drink = validDrinks[i];

        let name = drink.strDrink || drink.name || drink.drinkName;

        let imgSrc =
            drink.strDrinkThumb ||
            "images/placeholder.png";
        let card = document.createElement("div");
        card.className = "cocktail-card";

        let inner = document.createElement("div");
        inner.className = "card-inner";

        let front = document.createElement("div");
        front.className = "card-face card-front";

        let img = document.createElement("img");
        img.src = imgSrc;
        img.alt = name;

        let title = document.createElement("h3");
        title.textContent = name;

        let subtitle = document.createElement("p");
        subtitle.className = "subtitle";
        subtitle.textContent = "Hover to see the recipe";

        let back = document.createElement("div");
        back.className = "card-face card-back";

        let backTitle = document.createElement("h3");
        backTitle.textContent = name + " – Recipe";

        let ingredientsList = document.createElement("ul");
        ingredientsList.className = "card-ingredients";

        let instructionsPara = document.createElement("p");
        instructionsPara.className = "card-instructions";
        instructionsPara.textContent = "Loading recipe...";

        back.appendChild(backTitle);
        back.appendChild(ingredientsList);
        back.appendChild(instructionsPara);

        fillRecipeOnBack(drink, ingredientsList, instructionsPara);
        front.appendChild(img);
        front.appendChild(title);
        front.appendChild(subtitle);

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        container.appendChild(card);
    }
}


async function loadPopularCocktails() {
    try {
        let drinks = await getPopularCocktails();
        populatePopularCocktails(drinks);
    } catch (e) {
        console.error("Error loading popular cocktails:", e);
    }
}

function populatePopularCocktails(drinks) {
    let container = document.getElementById("popularCocktails");
    if (!container) return;

    container.innerHTML = "";

    if (!drinks || drinks.length === 0) {
        container.textContent = "No popular cocktails found.";
        return;
    }

    console.log("Popular sample drink:", drinks[0]);

    for (let i = 0; i < drinks.length; i++) {
        let drink = drinks[i];
        if (!drink) continue;

        let name =
            drink.strDrink ||
            "Unknown Cocktail";

        let imgSrc =
            drink.strDrinkThumb ||
            "images/placeholder.png";

        let card = document.createElement("div");
        card.className = "cocktail-card";

        let inner = document.createElement("div");
        inner.className = "card-inner";

        let front = document.createElement("div");
        front.className = "card-face card-front";

        let img = document.createElement("img");
        img.src = imgSrc;
        img.alt = name;

        let title = document.createElement("h3");
        title.textContent = name;

        let subtitle = document.createElement("p");
        subtitle.className = "subtitle";
        subtitle.textContent = "Hover to see the recipe";

        let back = document.createElement("div");
        back.className = "card-face card-back";

        let backTitle = document.createElement("h3");
        backTitle.textContent = name + " – Recipe";

        let ingredientsList = document.createElement("ul");
        ingredientsList.className = "card-ingredients";

        let instructionsPara = document.createElement("p");
        instructionsPara.className = "card-instructions";
        instructionsPara.textContent = "Loading recipe...";

        back.appendChild(backTitle);
        back.appendChild(ingredientsList);
        back.appendChild(instructionsPara);

        fillRecipeOnBack(drink, ingredientsList, instructionsPara);

        front.appendChild(img);
        front.appendChild(title);
        front.appendChild(subtitle);

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        container.appendChild(card);
    }
}



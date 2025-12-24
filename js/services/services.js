function buildFetchOptions(method, bodyObject) {
    let fetchOptions = {};
    fetchOptions.method = method.toLowerCase();
    if (fetchOptions.method == "post" || fetchOptions.method == "put") {
        fetchOptions.body = JSON.stringify(bodyObject);
        fetchOptions.headers = { "Content-Type": "application/json" };
    }
    return fetchOptions;
}

async function makeAPICall(url, method, idParam, bodyObject) {
    let fetchOptions = buildFetchOptions(method, bodyObject);
    if (idParam && idParam != null) {
        url += "/" + idParam;
    }
    let apiResponse = await fetch(url, fetchOptions);
    if (apiResponse.status != 200) {
        console.error("API error:", apiResponse.status, apiResponse.statusText);
        return undefined;
    }
    let apiResponseJSON = await apiResponse.json();
    return apiResponseJSON;
}

async function getCocktailList(ingredients) {
    let base = multiIngredientURL;

    if (!ingredients || ingredients.length === 0) {
        console.log("No ingredients selected, calling:", base);
        let data = await makeAPICall(base, "get");
        if (data && data.drinks) return data.drinks;
        return [];
    }
    let joined = ingredients.join(",");

    let url1 = base + "?ingredients=" + joined;
    console.log("Trying multiIngredient URL (ingredients):", url1);
    let data = await makeAPICall(url1, "get");
    if (data && data.drinks && data.drinks.length > 0) {
        console.log("Got drinks using ?ingredients=");
        console.log(data.drinks);
        return data.drinks;
    }
    console.log("multiIngredient returned no drinks for", joined);
    return [];
}

async function getCocktail(cocktailId) {
    if (!cocktailId) return null;

    let url = cocktailIdURL.replace(":idDrink", cocktailId);
    console.log("getCocktail URL:", url);

    let data = await makeAPICall(url, "get");
    if (data && data.drinks && data.drinks.length > 0) {
        return data.drinks[0];
    }
    return null;
}

async function getRandomCocktail() {
    let data = await makeAPICall(randomURL, "get");
    if (data && data.drinks && data.drinks.length > 0) {
        return data.drinks[0];
    }
    return null;
}

async function getPopularCocktails() {
    let data = await makeAPICall(popularURL, "get");
    if (data && data.drinks) {
        return data.drinks;
    }
    return [];
}

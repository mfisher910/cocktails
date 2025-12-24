let cocktailList = []

function buildFetchOptions(method,bodyObject) {
    let fetchOptions = {};
    fetchOptions.method = method.toLowerCase();
    if (fetchOptions.method == 'post' || fetchOptions.method == 'put') {
        fetchOptions.body = JSON.stringify(bodyObject);
        fetchOptions.headers = {"Content-Type":"application/json"};
    }
    return fetchOptions;
}
async function makeAPICall(url,method,idParam,bodyObject) {
    let fetchOptions = buildFetchOptions(method,bodyObject);
    if (idParam && idParam != null) {
        url += "/"+idParam;
    }
    console.log("url ",url)
    let apiResponse = await fetch(url,fetchOptions);
    if (apiResponse.status != 200) return undefined;
    let apiResponseJSON = await apiResponse.json();
    return apiResponseJSON;
}

async function getByName (name){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+name, "GET", undefined, undefined)
    console.log(response);
    return response;
}

async function getByFirstLetter (letter){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/search.php?f="+letter, "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function getByIngredientName (ingredient){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/search.php?i="+ingredient, "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function getById (id){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+id, "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function getByIngredientId (id){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid="+id, "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function randomCocktail (){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/random.php", "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function tenRandomCocktails (){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/randomselection.php", "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function listPopularCocktails (){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v2/961249867/popular.php", "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function listLatestCocktails (){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/latest.php", "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function searchByIngredient (ingredient){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+ingredient, "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function filterByMultiIngredient (ingredients){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v2/961249867/filter.php?i="+ingredients, "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function filterAlcoholic (alcohol){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a="+alcohol, "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function filterCategory (category){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+category, "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function filterGlass (glass){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass"+glass, "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function listCategories (){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list", "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function listGlasses (){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list", "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function listIngredients (){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list", "GET", undefined, undefined)
    console.log(response);
    return(response);
}

async function listAlcohols (){
    response = await makeAPICall("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list", "GET", undefined, undefined)
    console.log(response);
    return(response);
}

module.exports={
    getByFirstLetter,
    getByName,
    getByIngredientName,
    getById,
    getByIngredientId,
    randomCocktail,
    tenRandomCocktails,
    listPopularCocktails,
    listLatestCocktails,
    searchByIngredient,
    filterByMultiIngredient,
    filterAlcoholic,
    filterCategory,
    filterGlass,
    listCategories,
    listAlcohols,
    listGlasses,
    listIngredients
}
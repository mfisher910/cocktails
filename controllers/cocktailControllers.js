const cocktailService=require('../services/cocktailService.js');

async function getCocktailByNameAPI(req, resp){
    const cocktailName = req.query.name;
    const cocktailObj= await cocktailService.getByName(cocktailName);
    (cocktailObj==null)?resp.status(404).send("cannot find cocktail"):resp.json(cocktailObj);
}


async function getCocktailByFirstLetterAPI (req, resp){
    const cocktailLetter = req.query.firstLetter;
    const cocktailObj= await cocktailService.getByFirstLetter(cocktailLetter);
    (cocktailObj==null)?resp.status(404).send("cannot find cocktail"):resp.json(cocktailObj);
}

async function getByIngredientNameAPI (req, resp){
    const ingredientName = req.query.strIngredient;
    const cocktailObj= await cocktailService.getByIngredientName(ingredientName);
    (cocktailObj==null)?resp.status(404).send("cannot find cocktail"):resp.json(cocktailObj);
}

async function getByCocktailIdAPI (req, resp){
    const cocktailId = req.params.idDrink;
    const cocktailObj= await cocktailService.getById(cocktailId);
    (cocktailObj==null)?resp.status(404).send("cannot find cocktail"):resp.json(cocktailObj);
}

async function getByIngredientIdAPI (req, resp){
    const ingredientId = req.params.idIngredient;
    const cocktailObj= await cocktailService.getByIngredientId(ingredientId);
    (cocktailObj==null)?resp.status(404).send("cannot find cocktail"):resp.json(cocktailObj);
}

async function getRandomCocktailAPI (req, resp){
    const cocktailObj= await cocktailService.randomCocktail();
    (cocktailObj==null)?resp.status(404).send("cannot find cocktail"):resp.json(cocktailObj);
}

async function getTenRandomCocktailsAPI (req, resp){
    const cocktailObj= await cocktailService.tenRandomCocktails();
    (cocktailObj==null)?resp.status(404).send("cannot find cocktails"):resp.json(cocktailObj);
}

async function getPopularCocktailsAPI (req, resp){
    const cocktailObj= await cocktailService.listPopularCocktails();
    (cocktailObj==null)?resp.status(404).send("cannot find cocktails"):resp.json(cocktailObj);
}

async function getLatestCocktailsAPI (req, resp){
    const cocktailObj= await cocktailService.listLatestCocktails();
    (cocktailObj==null)?resp.status(404).send("cannot find cocktails"):resp.json(cocktailObj);
}


async function searchByIngredientAPI (req, resp){
    const cocktailIngredient = req.query.ingredient;
    const cocktailObj= await cocktailService.searchByIngredient(cocktailIngredient);
    (cocktailObj==null)?resp.status(404).send("cannot find cocktail"):resp.json(cocktailObj);
}


async function filterMultiIngredientAPI (req, resp){
    const cocktailIngredients = req.query.ingredients;
    const cocktailObj= await cocktailService.filterByMultiIngredient(cocktailIngredients);
    (cocktailObj==null)?resp.status(404).send("cannot find cocktail"):resp.json(cocktailObj);
}


async function filterAlcoholicAPI (req, resp){
    const cocktailAlcoholic = req.query.alcoholic;
    const cocktailObj= await cocktailService.filterAlcoholic(cocktailAlcoholic);
    (cocktailObj==null)?resp.status(404).send("cannot find cocktail"):resp.json(cocktailObj);
}


async function filterCategoryAPI (req, resp){
    const cocktailCategory = req.query.category;
    const cocktailObj= await cocktailService.filterCategory(cocktailCategory);
    (cocktailObj==null)?resp.status(404).send("cannot find cocktail"):resp.json(cocktailObj);
}


async function filterGlassAPI (req, resp){
    const cocktailGlass = req.query.glass;
    const cocktailObj= await cocktailService.filterGlass(cocktailGlass);
    (cocktailObj==null)?resp.status(404).send("cannot find cocktail"):resp.json(cocktailObj);
}

async function listCategoriesAPI (req, resp){
    const cocktailObj= await cocktailService.listCategories();
    (cocktailObj==null)?resp.status(404).send("cannot find categories"):resp.json(cocktailObj);
}


 async function listGlassesAPI (req, resp){
     const cocktailObj= await cocktailService.listGlasses();
     (cocktailObj==null)?resp.status(404).send("cannot find glasses"):resp.json(cocktailObj);
 }

 async function listIngredientsAPI (req, resp){
     const cocktailObj= await cocktailService.listIngredients();
     (cocktailObj==null)?resp.status(404).send("cannot find ingredients"):resp.json(cocktailObj);
 }

  async function listAlcoholsAPI (req, resp){
      const cocktailObj= await cocktailService.listAlcohols();
      (cocktailObj==null)?resp.status(404).send("cannot find alcohol"):resp.json(cocktailObj);
  }


module.exports={
    getCocktailByFirstLetterAPI,
    getCocktailByNameAPI,
    getByIngredientNameAPI,
    getByCocktailIdAPI,
    getByIngredientIdAPI,
    getRandomCocktailAPI,
    getTenRandomCocktailsAPI,
    getPopularCocktailsAPI,
    getLatestCocktailsAPI,
    searchByIngredientAPI,
    filterMultiIngredientAPI,
    filterAlcoholicAPI,
    filterCategoryAPI,
    filterGlassAPI,
    listCategoriesAPI,
    listGlassesAPI,
    listIngredientsAPI,
    listAlcoholsAPI
}
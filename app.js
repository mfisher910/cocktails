const express= require('express');
const cors=require("cors");
const bodyParser=require("body-parser")

const cocktailService = require('./services/cocktailService.js');
const cocktailController=require('./controllers/cocktailControllers.js');

const myApp= express();
const port=process.env.PORT || 9006;
myApp.use(bodyParser.json())
myApp.use(cors());

myApp.get('/cocktail', cocktailController.getCocktailByNameAPI);
myApp.get('/firstletter', cocktailController.getCocktailByFirstLetterAPI);
myApp.get('/ingredient', cocktailController.getByIngredientNameAPI);
myApp.get('/cocktail/:idDrink', cocktailController.getByCocktailIdAPI);
myApp.get('/ingredient/:idIngredient', cocktailController.getByIngredientIdAPI);
myApp.get('/random', cocktailController.getRandomCocktailAPI);
myApp.get('/random10', cocktailController.getTenRandomCocktailsAPI);
myApp.get('/popular', cocktailController.getPopularCocktailsAPI);
myApp.get('/latest', cocktailController.getLatestCocktailsAPI);
myApp.get('/searchIngredient', cocktailController.searchByIngredientAPI);
myApp.get('/multiIngredient', cocktailController.filterMultiIngredientAPI);
myApp.get('/alcoholic', cocktailController.filterAlcoholicAPI);
myApp.get('/category', cocktailController.filterCategoryAPI);
myApp.get('/glass', cocktailController.filterGlassAPI);
myApp.get('/categories', cocktailController.listCategoriesAPI);
myApp.get('/glasses', cocktailController.listGlassesAPI);
myApp.get('/ingredients', cocktailController.listIngredientsAPI);
myApp.get('/alcohols', cocktailController.listAlcoholsAPI);
/*myApp.delete("/course/:id",courseController.deleteCourseAPI);
myApp.put("/course/:id",courseController.updateCourseAPI);
myApp.post("/course",courseController.createCourseAPI);*/

myApp.listen(port, () => {
    console.log(`Server started on ${port}`);
}).on('error', (error)=> {
    console.log(error);
})
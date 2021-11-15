import {Router} from "express";

import * as DorayakiRequestService from "Services/dorayakirequest";
import * as RecipeService from "Services/recipe/";
import * as IngredientService from "Services/ingredient";

export default () => {
	const router = Router();

	//recipe route
	router.get("/recipe", RecipeService.get_recipes);
	router.get("/recipe/:recipe_id", RecipeService.get_recipe);

	//dorayaki request routes
	router.post("/dorayaki-request", DorayakiRequestService.create_request);
	router.post(
		"/dorayaki-request/accept/:dorayakirequest_id",
		DorayakiRequestService.accept_request
	);

	//ingredient routes
	router.get("/ingredient", IngredientService.get_ingredients);
	router.get("/ingredient/:ingredient_id", IngredientService.get_ingredient);
	router.post("/ingredient", IngredientService.create_ingredient);
	router.put("/ingredient/:ingredient_id", IngredientService.update_ingredient);

	return router;
};

import { Router } from "express";

import * as DorayakiRequestService from "Services/dorayakirequest";
import * as RecipeService from "Services/recipe/";
import * as IngredientService from "Services/ingredient";
import * as UserService from "Services/user";

export default () => {
  const router = Router();

  //user route
  router.post("/auth", UserService.login);

  //recipe route
  router.get("/recipe", RecipeService.get_recipes);
  router.get("/recipe/:recipe_id", RecipeService.get_recipe);
  router.post("/recipe/", RecipeService.create_recipe);
  router.put("/recipe/:recipe_id", RecipeService.update_recipe);

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

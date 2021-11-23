import { Router } from "express";

import * as DorayakiRequestService from "Services/dorayakirequest";
import * as RecipeService from "Services/recipe/";
import * as IngredientService from "Services/ingredient";
import * as UserService from "Services/user";
import protect_route from "Middleware/protect_route";

export default () => {
  const router = Router();

  //Authentication and Authorization route
  router.post("/auth/login", UserService.login);
  router.get("/auth", protect_route, UserService.auth);

  //recipe route
  router.get("/recipe", RecipeService.get_recipes);
  router.get("/recipe/:recipe_id", RecipeService.get_recipe);
  router.post("/recipe/", RecipeService.create_recipe);
  router.put("/recipe/:recipe_id", RecipeService.update_recipe);

  //dorayaki request routes
  router.get("/dorayaki-request", DorayakiRequestService.get_all_request);
  router.get(
    "/dorayaki-request/:dorayakirequest_id",
    DorayakiRequestService.get_request
  );
  router.post("/dorayaki-request", DorayakiRequestService.create_request);
  router.put(
    "/dorayaki-request/:dorayakirequest_id",
    DorayakiRequestService.update_request
  );

  //ingredient routes
  router.get("/ingredient", IngredientService.get_ingredients);
  router.get("/ingredient/:ingredient_id", IngredientService.get_ingredient);
  router.post("/ingredient", IngredientService.create_ingredient);
  router.put("/ingredient/:ingredient_id", IngredientService.update_ingredient);

  return router;
};

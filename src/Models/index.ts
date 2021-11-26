import LogRequest from "./LogRequest";
import User from "./User";
import DorayakiRequest from "./DorayakiRequest";
import Ingredient from "./Ingredient";
import Recipe from "./Recipe";
import RecipeIngredient from "./RecipeIngredient";

Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
  foreignKey: "recipe_id",
});

Ingredient.belongsToMany(Recipe, {
  through: RecipeIngredient,
  foreignKey: "ingredient_id",
});

DorayakiRequest.belongsTo(Recipe, {
  foreignKey: "recipe_id"
})

export {
  LogRequest,
  User,
  DorayakiRequest,
  Ingredient,
  Recipe,
  RecipeIngredient,
};

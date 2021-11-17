import { Request, Response } from "express";
import Joi from "joi";

import db from "Loaders/sequelize";
import { sendRes } from "Utils/api_util/";
import { UnitEnum } from "Utils/enum/";
import { RECIPE_LOG, SERVER_LOG } from "Utils/response_message/";

const Recipe = db.Recipe;
const Ingredient = db.Ingredient;
const RecipeIngredient = db.RecipeIngredient;

const options = {
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

export const get_recipes = async (_: Request, res: Response) => {
  const recipes = await Recipe.findAll();

  sendRes(res, 200, RECIPE_LOG.GET[200], recipes);
};

export const get_recipe = async (req: Request, res: Response) => {
  const { recipe_id } = req.params;

  const recipe = await Recipe.findByPk(recipe_id, {
    include: Ingredient,
    as: "ingredients",
  });
  if (!recipe) return sendRes(res, 404, RECIPE_LOG.GET[404]);

  return sendRes(res, 200, RECIPE_LOG.GET[200], recipe);
};

export const create_recipe = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(6).required(),
      Ingredients: Joi.array()
        .items({
          ingredient_id: Joi.number().min(0).required(),
          qty_required: Joi.number().min(0).required(),
        })
        .required(),
    });

    const { error } = schema.validate(req.body, options);

    const { name, Ingredients } = req.body;
    let recipe = new Recipe();

    console.log(error);
    if (error)
      return sendRes(res, 400, RECIPE_LOG.POST[400].BAD_REQUEST, error);

    recipe = await Recipe.create({ name });

    console.log(recipe);

    for (let recipeIntegredient of Ingredients) {
      const { qty_required, ingredient_id } = recipeIntegredient;
      let recipeIngredient = new RecipeIngredient();
      recipeIngredient = await RecipeIngredient.create({
        recipe_id: recipe.recipe_id,
        ingredient_id,
        qty_required,
      });

      console.log(recipeIngredient);
    }

    return sendRes(res, 200, RECIPE_LOG.POST[200], recipe);
  } catch (err) {
    return sendRes(res, 500, SERVER_LOG[500], err.message);
  }
};

export const update_recipe = async (req: Request, res: Response) => {
  try {
    const { recipe_id } = req.params;
    const recipe = await Recipe.findByPk(recipe_id);

    if (!recipe) return sendRes(res, 404, RECIPE_LOG.GET[404]);

    const schema = Joi.object({
      name: Joi.string().min(6).required(),
      Ingredients: Joi.object()
        .keys({
          name: Joi.string().min(6).required(),
          stock: Joi.number().min(0).required(),
          unit: Joi.string()
            .valid(
              UnitEnum.gram,
              UnitEnum.ml,
              UnitEnum.tbsp,
              UnitEnum.tsp,
              UnitEnum.pcs
            )
            .required(),
        })
        .required(),
    });

    const { error } = schema.validate(req.body, options);

    if (error) return sendRes(res, 400, RECIPE_LOG.PUT[400].BAD_REQUEST, error);

    const { name } = req.body;

    recipe.name = name ? name : recipe.name;

    await recipe.save();

    return sendRes(res, 200, RECIPE_LOG.POST[200], recipe);
  } catch (err) {
    return sendRes(res, 500, SERVER_LOG[500], err.message);
  }
};

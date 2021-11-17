import { Request, Response } from "express";
import Joi from "joi";

import db from "Loaders/sequelize";
import { sendRes } from "Utils/api_util/";
import { UnitEnum } from "Utils/enum/";
import { RECIPE_LOG, SERVER_LOG } from "Utils/response_message/";

const Recipe = db.Recipe;
const Ingredient = db.Ingredient;

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

    const { name, stock, unit } = req.body;
    let ingredient = new Ingredient();

    if (error)
      return sendRes(res, 400, RECIPE_LOG.POST[400].BAD_REQUEST, error);

    ingredient = await Ingredient.create({ name, stock, unit });

    return sendRes(res, 200, RECIPE_LOG.POST[200], ingredient);
  } catch (err) {
    return sendRes(res, 500, SERVER_LOG[500], err.message);
  }
};

export const update_ingredient = async (req: Request, res: Response) => {
  try {
    const { ingredient_id } = req.params;
    const ingredient = await Ingredient.findByPk(ingredient_id);

    if (!ingredient) return sendRes(res, 404, RECIPE_LOG.GET[404]);

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

    const { name, stock, unit } = req.body;

    ingredient.name = name ? name : ingredient.name;
    ingredient.stock = stock ? stock : ingredient.stock;
    ingredient.unit = unit ? unit : ingredient.unit;

    await ingredient.save();

    return sendRes(res, 200, RECIPE_LOG.POST[200], ingredient);
  } catch (err) {
    return sendRes(res, 500, SERVER_LOG[500], err.message);
  }
};

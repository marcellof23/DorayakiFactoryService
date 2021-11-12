import {Request, Response} from "express";

import db from "Loaders/sequelize";
import {sendRes} from "Utils/api_util/";
import {RECIPE_LOG} from "Utils/response_message/";

const Recipe = db.Recipe;
const Ingredient = db.Ingredient;

export const get_recipes = async (_: Request, res: Response) => {
	const recipes = await Recipe.findAll();

	sendRes(res, 200, RECIPE_LOG.GET[200], recipes);
};

export const get_recipe = async (req: Request, res: Response) => {
	const {recipe_id} = req.params;

	const recipe = await Recipe.findByPk(recipe_id, {
		include: Ingredient,
		as: "ingredients",
	});
	if (!recipe) return sendRes(res, 404, RECIPE_LOG.GET[404]);

	return sendRes(res, 200, RECIPE_LOG.GET[200], recipe);
};

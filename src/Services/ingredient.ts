import {Request, Response} from "express";
import Joi from "joi";

import db from "Loaders/sequelize";
import {sendRes} from "Utils/api_util/";
import {UnitEnum} from "Utils/enum/";
import {INGREDIENT_LOG, SERVER_LOG} from "Utils/response_message/";

const options = {
	allowUnknown: true, // ignore unknown props
	stripUnknown: true, // remove unknown props
};

const Ingredient = db.Ingredient;

export const get_ingredients = async (_: Request, res: Response) => {
	try {
		const ingredients = await Ingredient.findAll();

		if (!ingredients) return sendRes(res, 404, INGREDIENT_LOG.GET[404]);

		return sendRes(res, 200, INGREDIENT_LOG.GET[200], ingredients);
	} catch (err) {
		return sendRes(res, 500, SERVER_LOG[500], err.message);
	}
};

export const get_ingredient = async (req: Request, res: Response) => {
	try {
		const {ingredient_id} = req.params;

		const ingredient = await Ingredient.findByPk(ingredient_id);

		if (!ingredient) return sendRes(res, 404, INGREDIENT_LOG.GET[404]);

		return sendRes(res, 200, INGREDIENT_LOG.GET[200], ingredient);
	} catch (err) {
		return sendRes(res, 500, SERVER_LOG[500], err.message);
	}
};

export const create_ingredient = async (req: Request, res: Response) => {
	try {
		const schema = Joi.object({
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
		});

		const {error} = schema.validate(req.body, options);

		const {name, stock, unit} = req.body;
		let ingredient = new Ingredient();

		if (error)
			return sendRes(res, 400, INGREDIENT_LOG.POST[400].BAD_REQUEST, error);

		ingredient = await Ingredient.create({name, stock, unit});

		return sendRes(res, 200, INGREDIENT_LOG.POST[200], ingredient);
	} catch (err) {
		return sendRes(res, 500, SERVER_LOG[500], err.message);
	}
};

export const update_ingredient = async (req: Request, res: Response) => {
	try {
		const {ingredient_id} = req.params;
		const ingredient = await Ingredient.findByPk(ingredient_id);

		if (!ingredient) return sendRes(res, 404, INGREDIENT_LOG.GET[404]);

		const schema = Joi.object({
			name: Joi.string().min(6),
			stock: Joi.number().min(0),
			unit: Joi.string().valid(
				UnitEnum.gram,
				UnitEnum.ml,
				UnitEnum.tbsp,
				UnitEnum.tsp,
				UnitEnum.pcs
			),
		});

		const {error} = schema.validate(req.body, options);

		if (error)
			return sendRes(res, 400, INGREDIENT_LOG.PUT[400].BAD_REQUEST, error);

		const {name, stock, unit} = req.body;

		ingredient.name = name ? name : ingredient.name;
		ingredient.stock = stock ? stock : ingredient.stock;
		ingredient.unit = unit ? unit : ingredient.unit;

		await ingredient.save();

		return sendRes(res, 200, INGREDIENT_LOG.POST[200], ingredient);
	} catch (err) {
		return sendRes(res, 500, SERVER_LOG[500], err.message);
	}
};

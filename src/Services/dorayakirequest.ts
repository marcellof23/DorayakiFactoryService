import { Request, Response } from "express";
import Joi from "joi";

import db from "Loaders/sequelize";
import { DorayakiRequest as DorayakiRequestModel } from "Models/";
import { sendRes } from "Utils/api_util/";
import { DorayakiRequestStatus } from "Utils/enum/";
import {
	RECIPE_LOG,
	DORAYAKIREQUEST_LOG,
	SERVER_LOG,
} from "Utils/response_message/";

const Recipe = db.Recipe;
const DorayakiRequest = db.DorayakiRequest;

export const create_request = async (req: Request, res: Response) => {
	try {
		//validate request body
		const { recipe_id, qty = 1 } = req.body;

		const createSchema = Joi.object().keys({
			recipe_id: Joi.number().integer().required(),
			qty: Joi.number().integer().required().min(1),
		});
		const { error } = createSchema.validate(req.body);
		if (error) return sendRes(res, 400, DORAYAKIREQUEST_LOG.POST.CREATE[400], error.details[0].message);

		//validate related recipe
		const recipe = await Recipe.findByPk(recipe_id);
		if (!recipe) return sendRes(res, 404, RECIPE_LOG.GET[404]);

		const dorayakirequest = await DorayakiRequest.create({ recipe_id, qty });

		return sendRes(
			res,
			200,
			DORAYAKIREQUEST_LOG.POST.CREATE[200],
			dorayakirequest
		);
	} catch (err) {
		return sendRes(res, 500, SERVER_LOG[500], err.message);
	}
};

export const get_all_request = async (req: Request, res: Response) => {
	try {
		const dorayakirequest = await DorayakiRequest.findAll();

		return sendRes(
			res,
			200,
			DORAYAKIREQUEST_LOG.GET[200],
			dorayakirequest
		);
	} catch (err) {
		return sendRes(res, 500, SERVER_LOG[500], err.message);
	}
};

export const update_request = async (req: Request, res: Response) => {
	try {
		const { dorayakirequest_id } = req.params;

		const updateRequestSchema = Joi.object().keys({
			status: Joi.string().valid(...Object.values(DorayakiRequestStatus)).required(),
		});
		const { error } = updateRequestSchema.validate(req.body);
		if (error) return sendRes(res, 400, DORAYAKIREQUEST_LOG.POST[400], error.details[0].message);

		const { status }: { status: DorayakiRequestStatus } = req.body;

		const dr = await DorayakiRequest.findByPk(dorayakirequest_id);
		if (!dr) return sendRes(res, 404, DORAYAKIREQUEST_LOG.GET[404]);

		if (!(await dr.isAcceptable(dorayakirequest_id)))
			return sendRes(res, 400, DORAYAKIREQUEST_LOG.POST[400]);
	} catch (err) {
		return sendRes(res, 500, SERVER_LOG[500], err.message);
	}
};

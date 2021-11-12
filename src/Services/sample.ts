import {Request, Response} from "express";

import db from "Loaders/sequelize";
import {sendRes} from "Utils/api_util/";
import {SAMPLE_LOG} from "Utils/response_message/";

const Sample = db.Sample;

export const getSample = async (req: Request, res: Response) => {
	const samples = await Sample.findAll();

	sendRes(res, 200, SAMPLE_LOG.GET[200], samples);
};

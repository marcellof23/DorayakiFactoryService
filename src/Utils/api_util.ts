import {Response} from "express";
import {iResCodes, iStatus} from "./types";

import logger from "Loaders/winston/";

const generateLoggerString = (
	code: iResCodes,
	status: string,
	message: string,
	data?: any
) => `
	[LOG]  : ${code} - ${status} - ${message}
	[DATA] : ${JSON.stringify(data)}
`;

export const sendRes = (
	res: Response,
	code: iResCodes,
	message: string,
	data?: any
) => {
	const status: iStatus = code >= 400 ? "Error" : "OK";

	// logger
	const log = generateLoggerString(code, status, message, data);
	if (code > 400) logger.error(log);
	else logger.info(log);

	// sends the response
	res.status(code).json({
		code,
		status,
		message,
		data,
	});
};
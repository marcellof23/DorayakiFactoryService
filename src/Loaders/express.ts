import swaggerUI from "swagger-ui-express";
import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import routes from "routes";
import logger from "./winston";
import swaggerDocs from "./swagger";
import {sendRes} from "Utils/api_util/";
import {DEV_CORS, PROD_CORS} from "Utils/constants/";
import {SERVER_LOG} from "Utils/response_message/";

export default ({app}) => {
	const corsOption = {
		credentials: true,
		origin: process.env.NODE_ENV === "development" ? DEV_CORS : PROD_CORS,
	};

	app.use(bodyParser.json({limit: process.env.MAX_REQUEST_SIZE}));

	app.enable("trust-proxy");
	app.use(cors(corsOption));

	app.get("/", (req: Request, res: Response) => {
		res.status(200).json("This is a backend service for App");
	});

	app.get("/status", (req: Request, res: Response) => {
		res.status(200).end();
	});

	app.use(
		process.env.DOCS_PREFIX,
		swaggerUI.serve,
		swaggerUI.setup(swaggerDocs)
	);

	app.use(process.env.API_PREFIX, routes());

	app.use(cookieParser());

	app.use(process.env.STATIC_PREFIX, express.static("src/public"));

	app.use(
		morgan("combined", {
			stream: {
				write: (message) => {
					logger.info(message);
				},
			},
		})
	);

	app.use((_: Request, res: Response) => {
		return sendRes(res, 404, SERVER_LOG[404]);
	});
};

import {Router} from "express";

import * as SampleService from "Services/sample";

export default () => {
	const router = Router();

	//sample route
	router.get("/sample", SampleService.getSample);

	return router;
};

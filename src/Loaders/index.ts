import logger from "./winston";
import expressLoader from "./express";
import sequelizeLoader from "./sequelize";

export default async ({expressApp}) => {
	await expressLoader({app: expressApp});
	logger.info("✌️ Express loaded");

	if (process.env.SEQUELIZE_LOAD_DUMMY === "1") {
		await sequelizeLoader.conn.sync({force: true}).then(() => {
			sequelizeLoader
				.insertDummy()
				.then(() => {
					logger.info("SQL Dummy Loaded!");
				})
				.catch((err) => {
					if (err.parent?.sqlMessage) {
						logger.error(JSON.stringify(err.parent?.sqlMessage));
					} else {
						logger.error(err.message);
					}
				});
		});
	}

	logger.info("✌️ Sequelize loaded");
};

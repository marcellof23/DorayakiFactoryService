import {Sequelize} from "sequelize";

require("dotenv").config();

const conn = new Sequelize(
	process.env.SEQUELIZE_DB,
	process.env.SEQUELIZE_USERNAME,
	process.env.SEQUELIZE_PASSWORD,
	{
		host: process.env.SEQUELIZE_HOST,
		dialect: process.env.SEQUELIZE_DIALECT as any,
		define: {
			timestamps: false,
		},
		dialectOptions: {
			dateStrings: true,
			typeCast: function (field, next) {
				if (field.type === "DATETIME") {
					return field.string();
				}
				return next();
			},
		},
		logging: process.env.SEQUELIZE_LOGGING === "1",
		timezone: "+07:00",
		port: parseInt(process.env.SEQUELIZE_PORT),
	}
);

export default conn;

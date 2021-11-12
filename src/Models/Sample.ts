import sequelize from "Loaders/sequelize/connection";
import {DataTypes, Model} from "sequelize";

import User from "./User";

class Sample extends Model {
	public sample_id!: number;

	public dummy!: string;
}

Sample.init(
	{
		sample_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		dummy: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Sample",
		tableName: "sample",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

Sample.belongsTo(User, {
	foreignKey: "user_id",
	as: "samples",
});

export default Sample;

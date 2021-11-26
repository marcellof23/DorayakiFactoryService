import sequelize from "Loaders/sequelize/connection";
import { DataTypes, Model } from "sequelize";
import { UnitEnum } from "Utils/enum/";

class Ingredient extends Model {
	public ingredient_id!: number;

	public name!: string;

	public stock!: number;

	public unit!: UnitEnum;
}

Ingredient.init(
	{
		ingredient_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		name: {
			unique: true,
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 1,
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
			validate: {
				min: 0,
			},
		},
		unit: {
			type: DataTypes.ENUM(
				UnitEnum.gram,
				UnitEnum.ml,
				UnitEnum.tbsp,
				UnitEnum.tsp,
				UnitEnum.pcs
			),
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Ingredient",
		tableName: "ingredient",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

export default Ingredient;

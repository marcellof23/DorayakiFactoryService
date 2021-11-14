import sequelize from "Loaders/sequelize/connection";
import {DataTypes, Model} from "sequelize";
import {Ingredient} from ".";

class Recipe extends Model {
	public recipe_id!: number;

	public name!: string;

	public Ingredients?: [Ingredient];
}

Recipe.init(
	{
		recipe_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 1,
		},
	},
	{
		sequelize,
		modelName: "Recipe",
		tableName: "recipe",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

export default Recipe;

import sequelize from "Loaders/sequelize/connection";
import {DataTypes, Model} from "sequelize";

class RecipeIngredient extends Model {
	public recipe_id!: number;

	public name!: string;

	public qty_required!: number;
}

RecipeIngredient.init(
	{
		recipe_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		ingredient_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		qty_required: {
			type: DataTypes.INTEGER,
			validate: {
				min: 0,
			},
		},
	},
	{
		sequelize,
		modelName: "RecipeIngredient",
		tableName: "recipeingredient",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

export default RecipeIngredient;

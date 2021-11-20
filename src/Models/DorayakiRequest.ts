import sequelize from "Loaders/sequelize/connection";
import { DataTypes, Model } from "sequelize";
import { DorayakiRequestStatus } from "Utils/enum/";
import { Ingredient, Recipe, RecipeIngredient } from ".";

class DorayakiRequest extends Model {
	public dorayakirequest_id!: number;

	public recipe_id!: number;

	public qty!: number;

	public status: DorayakiRequestStatus;

	public isAcceptable: () => Promise<boolean> = async () => {
		const { recipe_id, qty } = this;

		// getting all the recipe ingredients
		const recipe: Recipe = await Recipe.findByPk(recipe_id, {
			include: Ingredient
		});
		const ingredients = recipe.Ingredients as [
			Ingredient & { RecipeIngredient: RecipeIngredient }
		];

		return ingredients.every(i => i.stock >= i.RecipeIngredient.qty_required * qty)
	};
}

DorayakiRequest.init(
	{
		dorayakirequest_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		recipe_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		qty: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		status: {
			type: DataTypes.ENUM(
				DorayakiRequestStatus.accepted,
				DorayakiRequestStatus.denied,
				DorayakiRequestStatus.pending
			),
			allowNull: false,
			defaultValue: DorayakiRequestStatus.pending,
		},
	},
	{
		sequelize,
		modelName: "DorayakiRequest",
		tableName: "dorayakirequest",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

export default DorayakiRequest;

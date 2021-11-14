import sequelize from "Loaders/sequelize/connection";
import {DataTypes, Model} from "sequelize";
import {DorayakiRequestStatus} from "Utils/enum/";
import {DORAYAKIREQUEST_LOG} from "Utils/response_message/";
import {Ingredient, Recipe, RecipeIngredient} from ".";

class DorayakiRequest extends Model {
	public dorayakirequest_id!: number;

	public recipe_id!: number;

	public qty!: number;

	public status: DorayakiRequestStatus;

	public isAcceptable: (dr: DorayakiRequest) => Promise<boolean>;
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
			type: DataTypes.STRING,
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

DorayakiRequest.prototype.isAcceptable = async (dr: DorayakiRequest) => {
	const {recipe_id, qty, status} = dr;

	// if (status != DorayakiRequestStatus.pending)
	// 	throw new Error(DORAYAKIREQUEST_LOG.POST.CREATE[400]);

	//getting all the recipe ingredients
	// const recipe: Recipe = await Recipe.findByPk(recipe_id, {
	// 	include: Ingredient,
	// });
	// const ingredients = recipe.Ingredients;
	// console.log(ingredients);
	// stock checking
	let res = false;
	// for (let i = 0; i < ingredients.length && !res; i++) {
	// 	const target: Ingredient = ingredients[i];
	// const required = target.qty_required * qty;

	// console.log(target);
	// }
	return res;
};

export default DorayakiRequest;

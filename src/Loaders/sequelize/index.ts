import {DataTypes, Op} from "sequelize";
import conn from "./connection";
import dummy from "Utils/dummy/";

import {
	User,
	Ingredient,
	LogRequest,
	DorayakiRequest,
	Recipe,
	RecipeIngredient,
} from "Models";

let db: {[k: string]: any} = {conn, DataTypes, Op};

db.User = User;
db.Ingredient = Ingredient;
db.LogRequest = LogRequest;
db.DorayakiRequest = DorayakiRequest;
db.Recipe = Recipe;
db.RecipeIngredient = RecipeIngredient;

db.insertDummy = async () => {
	const opt = {validate: true};
	await db.User.bulkCreate(dummy.User);
	await db.Ingredient.bulkCreate(dummy.Ingredient);
	await db.Recipe.bulkCreate(dummy.Recipe);
	await db.RecipeIngredient.bulkCreate(dummy.RecipeIngredient);
};

export default db;

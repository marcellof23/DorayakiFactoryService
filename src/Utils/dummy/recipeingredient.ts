interface iRecipeIngredient {
	[index: number]: {
		recipe_id: number;
		ingredient_id: number;
		qty_required: number;
	};
}

const data: iRecipeIngredient = [
	{
		recipe_id: 1,
		ingredient_id: 1,
		qty_required: 1,
	},
	{
		recipe_id: 1,
		ingredient_id: 2,
		qty_required: 1,
	},
	{
		recipe_id: 1,
		ingredient_id: 3,
		qty_required: 5,
	},
];

export default data;

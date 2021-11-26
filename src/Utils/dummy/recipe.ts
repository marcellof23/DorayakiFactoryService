interface iRecipes {
	[index: number]: {
		recipe_id: number;
		name: string;
	};
}

const data: iRecipes = [
	{
		recipe_id: 1,
		name: "Original Dorayaki",
	},
	{
		recipe_id: 2,
		name: "Candy Dorayaki",
	},
	{
		recipe_id: 3,
		name: "Cheese Dorayaki",
	},
	{
		recipe_id: 4,
		name: "Chocolate Dorayaki",
	},
	{
		recipe_id: 5,
		name: "Strawberry Dorayaki",
	},
	{
		recipe_id: 6,
		name: "Oreo Dorayaki",
	},
	{
		recipe_id: 7,
		name: "Popcorn Dorayaki",
	},
	{
		recipe_id: 8,
		name: "Popcorn Dorayaki",
	},
	{
		recipe_id: 9,
		name: "Greentea Dorayaki",
	},
	{
		recipe_id: 10,
		name: "Pudding Dorayaki",
	},
	{
		recipe_id: 11,
		name: "Bubble Gum Dorayaki",
	},
	{
		recipe_id: 12,
		name: "Special Dorayaki",
	},
];

export default data;

interface iRecipes {
	[index: number]: {
		recipe_id: number;
		name: string;
	};
}

const data: iRecipes = [
	{
		recipe_id: 1,
		name: "Dorayaki Kecap",
	},
];

export default data;

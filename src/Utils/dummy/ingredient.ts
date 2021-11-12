import {UnitEnum} from "../enum";

interface iIngredients {
	[index: number]: {
		ingredient_id: number;
		name: string;
		stock: number;
		unit: UnitEnum;
	};
}

const data: iIngredients = [
	{
		ingredient_id: 1,
		name: "tepung",
		stock: 10,
		unit: UnitEnum.tbsp,
	},
	{
		ingredient_id: 2,
		name: "telur",
		stock: 10,
		unit: UnitEnum.pcs,
	},
	{
		ingredient_id: 3,
		name: "kecap",
		stock: 10,
		unit: UnitEnum.ml,
	},
];

export default data;

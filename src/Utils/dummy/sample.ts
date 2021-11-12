interface iSamples {
	[index: number]: {
		sample_id: number;
		dummy?: string;
		user_id: number;
	};
}

const data: iSamples = [
	{
		sample_id: 1,
		dummy: "test",
		user_id: 1,
	},
];

export default data;

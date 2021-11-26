interface iUsers {
	[index: number]: {
		user_id: number;
		username: string;
		email: string;
		name: string;
		password: string;
		role: "Admin" | "User";
	};
}

const data: iUsers = [
	{
		user_id: 1,
		username: "username",
		email: '13519134@std.stei.itb.ac.id',
		name: "user",
		password: "password",
		role: "User",
	},
];

export default data;

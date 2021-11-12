interface iUsers {
	[index: number]: {
		user_id: number;
		username: string;
		name: string;
		password: string;
		role: "Admin" | "User";
	};
}

const data: iUsers = [
	{
		user_id: 1,
		username: "username",
		name: "user",
		password: "password",
		role: "User",
	},
];

export default data;

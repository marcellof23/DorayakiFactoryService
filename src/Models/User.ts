import bcrypt from "bcryptjs";
import sequelize from "Loaders/sequelize/connection";
import {DataTypes, Model} from "sequelize";

class User extends Model {
	public user_id!: string;

	public username!: string;

	public name!: string;

	public password!: string;

	public check_password: (
		inputPassword: string,
		actualPassword: string
	) => Promise<boolean>;
}

User.init(
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "User",
		tableName: "user",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

User.beforeCreate(async (user) => {
	if (user.changed("password"))
		user.password = await bcrypt.hash(
			user.password,
			parseInt(process.env.BCRYPT_SALTVERSION)
		);

	user.username = user.username.toLowerCase();
});

User.prototype.check_password = async (inputPassword, actualPassword) =>
	await bcrypt.compare(inputPassword, actualPassword);

User.beforeBulkCreate(async (users) => {
	users = await Promise.all(
		users.map(async (row: any) => {
			row.password = await bcrypt.hash(
				row.password,
				parseInt(process.env.BCRYPT_SALTVERSION)
			);
			return row;
		})
	);
});

User.beforeCreate(async (user) => {
	user.password = await bcrypt.hash(
		user.password,
		parseInt(process.env.BCRYPT_SALTVERSION)
	);
});

export default User;
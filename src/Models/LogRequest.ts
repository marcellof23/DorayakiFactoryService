import sequelize from "Loaders/sequelize/connection";
import {DataTypes, Model} from "sequelize";

class LogRequest extends Model {
	public logrequest_id!: number;

	public ip!: string;

	public endpoint!: string;
}

LogRequest.init(
	{
		logrequest_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		ip: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		endpoint: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "LogRequest",
		tableName: "logrequest",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

export default LogRequest;

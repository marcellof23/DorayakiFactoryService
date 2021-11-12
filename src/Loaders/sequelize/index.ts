import {DataTypes, Op} from "sequelize";
import conn from "./connection";
import dummy from "Utils/dummy/";

import {User, Sample} from "Models";

let db: {[k: string]: any} = {conn, DataTypes, Op};

db.User = User;
db.Sample = Sample;

db.insertDummy = async () => {
	const opt = {validate: true};
	await db.User.bulkCreate(dummy.User);
	await db.Sample.bulkCreate(dummy.Sample);
};

export default db;

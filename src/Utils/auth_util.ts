import jwt from "jsonwebtoken";
import {promisify} from "util";

const sign_token = (id) =>
	jwt.sign({id}, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES,
	});

const day = 86400 * 1000; //total milliseconds in a day

const create_send_token = (res, user, statusCode) => {
	const token = sign_token(user.id);
	const cookieOptions: {[k: string]: any} = {
		expires: new Date(
			Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES) * day
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

	res.cookie("jwt", token, cookieOptions);
	user.password = undefined;

	res.status(statusCode).json({
		status: "success",
		body: {
			data: user,
			token,
		},
	});
};

const verify_token = promisify(jwt.verify);

export {create_send_token, verify_token};

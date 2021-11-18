import { Request, Response } from "express";
import Joi from "joi";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "Loaders/sequelize";
import { sendRes } from "Utils/api_util/";
import { USER_LOG, SERVER_LOG } from "Utils/response_message/";
import { User as UserModel } from "Models/";
import { create_send_token } from "Utils/auth_util/";

const User = db.User;

const options = {
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginSchema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = loginSchema.validate(req.body, options);
    if (error) return sendRes(res, 400, USER_LOG.POST[400].BAD_REQUEST, error);

    const { username, password } = req.body;
    const where = { username };
    const user: UserModel = await User.findOne({ where });

    if (!user) return sendRes(res, 400, USER_LOG.POST[400].BAD_REQUEST);

    const isCorrectPassword = await user.check_password(
      password,
      user.password
    );

    if (!isCorrectPassword) {
      return sendRes(res, 400, USER_LOG.POST[400].BAD_REQUEST);
    }

    delete user.password;

    const tokenData = {
      user,
      type: "access_token",
    };

    console.log(isCorrectPassword);

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return sendRes(res, 200, USER_LOG.POST[200], {
      user,
      token
    });
  } catch (err) {
    return sendRes(res, 400, USER_LOG.POST[400].FAIL);
  }
};

export const auth = async (req: any, res: Response) => {
  return sendRes(res, 200, USER_LOG.POST[200], { user: req.user });
};

import db from "Loaders/sequelize";
import { verify_token } from "Utils/auth_util";

const User = db.User;

const protect_route = async (req, res, next) => {
  const { authorization: auth } = req.headers;
  const token = auth && auth.startsWith("Bearer") ? auth.split(" ")[1] : null;
  try {
    // Check token
    if (!token)
      throw new Error("You are not logged in! Please log in to get access.");

    // Verify token
    const temp = await verify_token(token, process.env.JWT_SECRET_KEY);
    const user_id = temp.user.user_id;
    const where = { user_id };
    // Check user
    const user = await User.findOne({ where });
    if (!user)
      throw new Error("The user belonging to this token does no longer exist.");
    req.user = user.dataValues;
    next();
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export default protect_route;

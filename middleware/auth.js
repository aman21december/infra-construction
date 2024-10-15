const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../helper");
const { User } = require("../models/user");

/**
 *
 * Auth middleware checks if token is available in the header, is it's unavailable isAuth is passed as false,
 * isAuth is false even if there's error in decoding the token.
 *
 * User is shown unauthorized here. This middleware only check if user is authenticated or not.
 *
 * @param {*} req -> Express request object
 * @param {*} res -> Express response object
 * @param {*} next -> Express middleware next function
 * @returns
 */

module.exports =async function (req, res, next) {
	const { token } = req.cookies;
	let user = { isAuth: false };
	req.user = user;

	if (!token||token=='null'||token==null) return next(new ErrorHandler(400,"unauthorised"));

	let decoded;
	try {
		decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
	} catch (err) {
		return next(err);
	}

	if (!decoded) return next(new ErrorHandler(400,"unauthorised"));
	const user1=await User.findByPk(decoded.id)
	user = { ...user, isAuth: true, ...decoded,role:user1.role };
	req.user =user;
	return next();
};

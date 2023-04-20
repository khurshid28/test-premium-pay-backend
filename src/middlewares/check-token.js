const jwt = require("../utils/jwt.js");
const User = require("../models/User.js");
const Super = require("../models/Super.js");
const {
	AuthorizationError,
	ForbiddenError,
	InternalServerError,
	InvalidTokenError
} = require("../utils/errors.js");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(" ")[1];

		if (!token) {
			return next(new AuthorizationError(401, "No token provided"));
		}

		const { userId, agent, role } = jwt.verify(token);
		const user = (await User.findById(userId)) || (await Super.findById(userId));
		if (!user) {
			return next(new AuthorizationError(401, "Invalid token"));
		}

		const reqAgent = req.headers["user-agent"];
		if (agent !== reqAgent) {
			return next(
				new ForbiddenError(403, "You can't log in different devices")
			);
		}

		req.user = {
			id: user._id,
			role,
		};
		return next();
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			return next(new AuthorizationError(401, "Token has expired"));
		} else if (error instanceof JsonWebTokenError) {
			return next(new InvalidTokenError(401, "Malformed token"));
		}
		return next(new InternalServerError(500, error.message));
	}
};

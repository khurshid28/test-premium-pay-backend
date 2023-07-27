const Super = require("../models/Super.js");
const Admin = require("../models/Admin.js");
const User = require("../models/User.js");
const Merchant = require("../models/Merchant.js");
const {
    InternalServerError,
    AuthorizationError,
    BadRequestError,
    NotFoundError
} = require("../utils/errors.js");
const jwt = require("../utils/jwt.js");
const { mockUser, mockSuper } = require("../../mock.js");

class Login {
    async userLogin(req, res, next) {
        try {
            const { loginName, loginPassword } = req.body;

            const user =
                (await User.findOne({ loginName })) ||
                (await Super.findOne({ loginName })) || (await Admin.findOne({ loginName }));
            if (!user || user.loginPassword !== loginPassword) {
                return next(new AuthorizationError(401, "Invalid login credentials!"));
            }

            if (user.work_status == "deleted") {
                return next(new NotFoundError(404, "Not Found"));
            } else if (user.work_status == "blocked") {
                return next(new BadRequestError(400, "You are blocked and No Active"));
            }
            const token = jwt.sign({
                userId: user["_id"],
                agent: req.headers["user-agent"],
                role: user.role,
            });

            if (user.role == "user") {
                let merchant = await Merchant.findOne({
                    "merchant_id": user.merchant_id
                })
                if (!merchant) {
                    return next(new NotFoundError(404, "Merchant Not Found"));
                }
                return res
                    .status(200)
                    .json({ data: user, message: "Here is your token", token, "percent": merchant.percent, });
            } else {
                return res
                    .status(200)
                    .json({ data: user, message: "Here is your token", token, });
            }
        } catch (error) {
            return next(new InternalServerError(500, error.message));
        }
    }
    async addMockUser(req, res, next) {
        try {
            await User.insertMany(mockUser);
            res.status(200).json("User inserted");
        } catch (error) {
            return next(new InternalServerError(500, error.message));
        }
    }
    async addMockAdmin(req, res, next) {
        try {
            await Super.insertMany(mockSuper);
            res.status(200).json("Admins inserted");
        } catch (error) {
            return next(new InternalServerError(500, error.message));
        }
    }
}

module.exports = new Login();
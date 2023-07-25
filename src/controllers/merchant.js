const {
    InternalServerError, BadRequestError,
} = require("../utils/errors.js");
const cryptoRandomString = require("secure-random-string");
const MerchantModel = require("../models/Merchant.js");
const AdminModel = require("../models/Admin.js");
class Merchant {

    async create(req, res, next) {
        try {
            if (req.user.role !== "super_admin") {
                return next(
                    new ForbiddenError(
                        403,
                        "You do not have permission to access this resource"
                    )
                );
            }
            const {
                fullName,
                phoneNumber,
                address,
                type,
                name,

            } = req.body;
            const loginName = cryptoRandomString({ length: 10 });
            const loginPassword = cryptoRandomString({ length: 15 });
            let admin = await AdminModel.create({
                fullName,
                phoneNumber,
                address,
                loginName,
                loginPassword

            });
            console.log("admin >>")
            console.log(admin)
            if (admin) {
                console.log("user")
                console.log(req.user)
              let merchant=   await MerchantModel.create({
                    "who_created": req.user["id"],
                    "admin_id": admin["_id"],
                    type,
                    name,
                });
                res.status(201).json({
                    "message": "Merchant is created successfully",
                    admin,
                    merchant
                });
            } else {
                return next(new BadRequestError(400, "Admin isnot created"));
            }
        } catch (error) {
            console.log(error.message)
            return next(new InternalServerError(500, error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            if (req.user.role !== "super_admin") {
                return next(
                    new ForbiddenError(
                        403,
                        "You do not have permission to access this resource"
                    )
                );
            }

            let merchant = await MerchantModel.find();
            res.status(200).json(merchant);
        } catch (error) {
            console.log(error.message)
            return next(new InternalServerError(500, error.message));
        }
    }

}

module.exports = new Merchant();
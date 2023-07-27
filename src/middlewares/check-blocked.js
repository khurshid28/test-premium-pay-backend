const User = require("../models/User.js");
const Super = require("../models/Super.js");
const Admin = require("../models/Admin.js");
const {
    ForbiddenError,
    InternalServerError,
    NotFoundError
} = require("../utils/errors.js");

module.exports = async(req, res, next) => {
    try {
        if (req.user.role == "super_admin") {
            let super_admin = await Super.findOne({
                "_id": req.user.id
            });
            if (super_admin) {
                if (super_admin.work_status == "deleted" || super_admin.work_status == "blocked") {
                    return next(
                        new ForbiddenError(
                            403,
                            "You are " + super_admin.work_status + ", now you have no permission"
                        )
                    );
                }
            } else {
                return next(
                    new NotFoundError(
                        404,
                        "Super admin Not found"
                    )
                );
            }
        }

        if (req.user.role == "admin") {
            let admin = await Admin.findOne({
                "_id": req.user.id
            });
            if (admin) {
                if (admin.work_status == "deleted" || admin.work_status == "blocked") {
                    return next(
                        new ForbiddenError(
                            403,
                            "You are " + admin.work_status + ", now you have no permission"
                        )
                    );
                }
            } else {
                return next(
                    new NotFoundError(
                        404,
                        "Admin Not found"
                    )
                );
            }
        }
        if (req.user.role == "user") {
            let user = await User.findOne({
                "_id": req.user.id
            });
            if (user) {
                if (user.work_status == "deleted" || user.work_status == "blocked") {
                    return next(
                        new ForbiddenError(
                            403,
                            "You are " + user.work_status + ", now you have no permission"
                        )
                    );
                }
            } else {
                return next(
                    new NotFoundError(
                        404,
                        "User Not found"
                    )
                );
            }
        }
        return next();
    } catch (error) {

        return next(new InternalServerError(500, error.message));
    }
};
const {
    InternalServerError,
} = require("../utils/errors.js");

const FillialModel = require("../models/Fillial.js");
class Fillial {

    async create(req, res, next) {
        try {
            if (req.user.role === "user") {
                return next(
                    new ForbiddenError(
                        403,
                        "You do not have permission to access this resource"
                    )
                );
            }
            const {
                merchant_id,
                address,
                name,
                inn
            } = req.body;


            let fillial = await FillialModel.create({
                merchant_id,
                address,
                name,
                inn,
                "who_created": req.user.id
            });
            res.status(201).json({
                "message": "Fillial is created successfully",
                fillial
            });
        } catch (error) {
            return next(new InternalServerError(500, error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            if (req.user.role == "user") {
                return next(
                    new ForbiddenError(
                        403,
                        "You do not have permission to access this resource"
                    )
                );
            }

            let { merchant_id } = req.params;
            let fillials = await FillialModel.find({ merchant_id });
            res.status(200).json(fillials);
        } catch (error) {
            return next(new InternalServerError(500, error.message));
        }
    }

}

module.exports = new Fillial();
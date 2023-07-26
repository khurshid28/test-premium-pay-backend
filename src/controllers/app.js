const {
    InternalServerError
} = require("../utils/errors.js");

const AppModel = require("../models/App.js");
class App {

    async upload(req, res, next) {
        try {
            // if (req.user.role !== "user") {
            // 	return next(
            // 		new ForbiddenError(
            // 			403,
            // 			"You do not have permission to access this resource"
            // 		)
            // 	);
            // }
            const { user_id, status, canceled_reason, fullname, middlename, device, location, products, amount, payment_amount, expired_month } = req.body;
            let app = await AppModel.create({
                user_id,
                status,
                canceled_reason,
                fullname,
                middlename,
                device,
                location,
                products,
                amount,
                payment_amount,
                expired_month


            });
            res.status(201).json({
                "message": "App is created Successfully",
                app,
            });
        } catch (error) {
            console.log(error.message)
            return next(new InternalServerError(500, error.message));
        }
    }
    async get(req, res, next) {
        // if (req.user.role !== "user") {
        //     return next(
        //         new ForbiddenError(
        //             403,
        //             "You do not have permission to access this resource"
        //         )
        //     );
        // }
        try {
            console.log(req.params)
            const { user_id } = req.params;

            const apps = await AppModel.find({ user_id });
            res.status(200).json(apps);
        } catch (error) {
            console.log(error.message)
            return next(new InternalServerError(500, error.message));
        }
    }
    async getAll(req, res, next) {
        try {
            const { merchant_id } = req.params;
            if (req.user.role === "user") {
                return next(
                    new ForbiddenError(
                        403,
                        "You do not have permission to access this resource"
                    )
                );
            } else if (req.user.role === "admin") {
                const apps = await AppModel.find({ merchant_id });
                res.status(200).json(apps);
            } else {
                const apps = await AppModel.find();
                res.status(200).json(apps);
            }
            const apps = await AppModel.find();
            res.status(200).json(apps);
        } catch (error) {
            console.log(error.message)
            return next(new InternalServerError(500, error.message));
        }
    }



}

module.exports = new App();
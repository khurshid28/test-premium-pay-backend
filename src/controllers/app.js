const {
    InternalServerError
} = require("../utils/errors.js");

const AppModel = require("../models/App.js");
class App {

    async upload(req, res, next) {
        try {
            const { user_id, status, canceled_reason,user_fullname } = req.body;
            await AppModel.create({
				user_id, status, canceled_reason,user_fullname
			});
            res.status(200).json({
                "message":"App is created Successfully"
            });
        } catch (error) {
            console.log(error.message)
            return next(new InternalServerError(500, error.message));
        }
    }
    async get(req, res, next) {
        try {
            const { user_id, status, canceled_reason } = req.body;
            const apps = await AppModel.find({ user_id });
            res.status(200).json(apps);
        } catch (error) {
            console.log(error.message)
            return next(new InternalServerError(500, error.message));
        }
    }
    async getAll(req, res, next) {
        try {
            const { user_id, status, canceled_reason } = req.body;
            const apps = await AppModel.find();
            res.status(200).json(apps);
        } catch (error) {
            console.log(error.message)
            return next(new InternalServerError(500, error.message));
        }
    }



}

module.exports = new App();
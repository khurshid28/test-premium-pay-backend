const User = require("../models/User.js");
const Merchant = require("../models/Merchant.js");
const { InternalServerError, ForbiddenError } = require("../utils/errors.js");

class Users {
	async getAllUsers(req, res, next) {
		try {
			if (req.user.role !== "super_admin") {
				return next(
					new ForbiddenError(
						403,
						"You do not have permission to access this resource"
					)
				);
			}
			const users = await User.find({ role: "user" });
			return res.status(200).send(users);
		} catch (error) {
			return next(new InternalServerError(500, error.message));
		}
	}
	async getUser(req, res, next) {
		try {
			if (req.user.role !== "super_admin") {
				return next(
					new ForbiddenError(
						403,
						"You do not have permission to access this resource"
					)
				);
			}
			const user = await User.findById(req.params.id);
			return res.status(200).send(user);
		} catch (error) {
			return next(new InternalServerError(500, error.message));
		}
	}
	async createUser(req, res, next) {
		try {
			if (req.user.role === "user") {
				return next(
					new ForbiddenError(
						403,
						"You do not have permission to access this resource"
					)
				);
			}
			if(req.user.role !== "admin"){
				let merchant  = await Merchant.findOne({ "_id": req.user.merchant_id});
				if (!merchant) {
					return next(
						new ForbiddenError(
							403,
							"You do not have permission to access this resource"
						)
					);
				}else{
					if(merchant.type == "Agent") {
						return next(
							new ForbiddenError(
								403,
								"You do not have permission to access this resource"
							)
						);
					}
				}
			}
			

			let imageUrl = req.file.filename;
			const {
				fullName,
				phoneNumber,
				merchant_id,
				fillial_id,
				gender,
				address,
				age,
				
			} = req.body;

			// Generate random login name and password
			const loginName = cryptoRandomString({ length: 10 });
			const loginPassword = cryptoRandomString({ length: 15 });

			const existingUser = await User.exists({ phoneNumber });
			if (existingUser) {
				return next(
					new BadRequestError(
						400,
						"A super with the given phone number already exists"
					)
				);
			}

			await User.create({
				loginName,
				loginPassword,
				merchant_id,
				fillial_id,
				imageUrl,
				fullName,
				phoneNumber,
				age,
				gender,
				address,
			});
			
			return res.status(201).json({ loginName, loginPassword });
		} catch (error) {
			return next(new InternalServerError(500, error.message));
		}
	}
	async updateUser(req, res, next) {
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
				email,
				course,
				birthDate,
				gender,
				address,
				description,
				work_status,
			} = req.body;
			let image = req.file ? req.file.filename : null; // use null if no file was uploaded

			const user = await User.findById(req.params.id);
			if (!user) {
				return next(new NotFoundError(404, "User not found"));
			}

			user.imageUrl = image ? image : user.imageUrl;
			user.fullName = fullName || user.fullName;
			user.phoneNumber = phoneNumber || user.phoneNumber;
			user.email = email || user.email;
			user.course = course || user.course;
			user.birthDate = birthDate || user.birthDate;
			user.gender = gender || user.gender;
			user.address = address || user.address;
			user.description = description || user.description;
			user.work_status = work_status || user.work_status;

			await user.save();

			return res
				.status(200)
				.send({ message: "Successfully updated", data: user });
		} catch (error) {
			return next(new InternalServerError(500, error.message));
		}
	}
	async deleteUser(req, res, next) {
		try {
			if (req.user.role !== "super_admin") {
				return next(
					new ForbiddenError(
						403,
						"You do not have permission to access this resource"
					)
				);
			}

			const user = await User.findById(req.params.id);
			if (!user) {
				return next(new NotFoundError(404, "User not found!"));
			}

			await User.deleteOne({ _id: req.params.id });

			return res.status(200).send({ message: "User deleted" });
		} catch (error) {
			return next(new InternalServerError(500, error.message));
		}
	}
}

module.exports = new Users();

const Super = require("../models/Super.js");
const cryptoRandomString = require("secure-random-string");
const {
	InternalServerError,
	ForbiddenError,
	BadRequestError,
	NotFoundError,
} = require("../utils/errors.js");

class SuperAdmin {
	async getAllSuper(req, res, next) {
		try {
			if (req.user.role !== "super_admin") {
				return next(
					new ForbiddenError(
						403,
						"You do not have permission to access this resource"
					)
				);
			}
			const supers = await Super.find({ role: "super_admin" });
			return res.status(200).send(supers);
		} catch (error) {
			return next(new InternalServerError(500, error.message));
		}
	}
	async getSuper(req, res, next) {
		try {
			if (req.user.role !== "super_admin") {
				return next(
					new ForbiddenError(
						403,
						"You do not have permission to access this resource"
					)
				);
			}
			const superr = await Super.findById(req.params.id);
			return res.status(200).send(superr);
		} catch (error) {
			return next(new InternalServerError(500, error.message));
		}
	}
	async createSuper(req, res, next) {
		try {
			if (req.user.role !== "super_admin") {
				return next(
					new ForbiddenError(
						403,
						"You do not have permission to access this resource"
					)
				);
			}
			let imageUrl = req.file.filename;
			const {
				fullName,
				phoneNumber,
				email,
				birthDate,
				gender,
				address,
				description,
			} = req.body;

			// Generate random login name and password
			const loginName = cryptoRandomString({ length: 10 });
			const loginPassword = cryptoRandomString({ length: 15 });

			const existingUser = await Super.exists({ phoneNumber });
			if (existingUser) {
				return next(
					new BadRequestError(
						400,
						"A super with the given phone number already exists"
					)
				);
			}

			await Super.create({
				loginName,
				loginPassword,
				imageUrl,
				fullName,
				phoneNumber,
				email,
				birthDate,
				gender,
				address,
				description,
			});
			return res.status(201).json({ loginName, loginPassword });
		} catch (error) {
			return next(new InternalServerError(500, error.message));
		}
	}
	async updateSuper(req, res, next) {
		try {
			if (req.superr.role !== "super_admin") {
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
				birthDate,
				gender,
				address,
				description,
			} = req.body;
			let image = req.file ? req.file.filename : null; // use null if no file was uploaded

			const superr = await Super.findById(req.params.id);
			if (!superr) {
				return next(new NotFoundError(404, "Super admin not found"));
			}

			superr.imageUrl = image ? image : superr.imageUrl;
			superr.fullName = fullName || superr.fullName;
			superr.phoneNumber = phoneNumber || superr.phoneNumber;
			
			superr.birthDate = birthDate || superr.birthDate;
			superr.gender = gender || superr.gender;
			superr.address = address || superr.address;
			superr.description = description || superr.description;

			await superr.save();

			return res
				.status(200)
				.send({ message: "Successfully updated", data: superr });
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

			const superr = await Super.findById(req.params.id);
			if (!superr) {
				return next(new NotFoundError(404, "Super not found!"));
			}

			await Super.deleteOne({ _id: req.params.id });

			return res.status(200).send({ message: "Super deleted" });
		} catch (error) {
			return next(new InternalServerError(500, error.message));
		}
	}
}

module.exports = new SuperAdmin();

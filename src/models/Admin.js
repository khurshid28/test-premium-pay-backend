const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
	{
		loginName: {
			type: String,
			required: true,
		},
		loginPassword: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
		},
		fullName: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
			unique: true,
			match: /^\+998([378]{2}|(9[013-57-9]))\d{7}$/,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		birthDate: {
			type: Date,
			required: true,
		},
		gender: {
			type: String,
			enum: ["Мужской", "Женский"],
			required: true,
		},
		address: {
			type: {
				region: {
					type: String,
					required: true,
				},
				city: {
					type: String,
					required: true,
				},
				homeAddress: {
					type: String,
					required: true,
				},
			},
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "admin"
		}
	},
	{ timestamps: true }
);

adminSchema.index({ phoneNumber: 1 });

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

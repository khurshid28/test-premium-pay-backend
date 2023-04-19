const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
			default: "user"
		}
	},
	{ timestamps: true }
);

userSchema.index({ phoneNumber: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;

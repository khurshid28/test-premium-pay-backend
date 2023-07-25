const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		fillial_id: {
			type: String,
			required: true,
		},
		merchant_id: {
			type: String,
			required: true,
		},
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
			default:null
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
		age: {
			type: Number,
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

const User = mongoose.model("User-test6", userSchema);

module.exports = User;

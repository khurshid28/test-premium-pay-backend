const mongoose = require("mongoose");

const superSchema = new mongoose.Schema({
    loginName: {
        type: String,
        required: true,
    },
    loginPassword: {
        type: String,
        required: true,
    },

    fullName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^\+998([378]{2}|(9[013-57-9]))\d{7}$/,
    },
    role: {
        type: String,
        default: "super_admin"
    }
}, { timestamps: true });

superSchema.index({ phoneNumber: 1 });

const Super = mongoose.model("Super-test8", superSchema);

module.exports = Super;
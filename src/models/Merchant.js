const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema(
    {
        who_edited: {
            type: String,
            default: null,
        },
        who_deleted: {
            type: String,
            default: null,
        },
        who_created: {
            type: String,
            default: null,
        },
        admin_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "Merchant",
            enum: ["Merchant", "Agent"],
        },
        

    },
    { timestamps: true }
);


const Merchant = mongoose.model("merchant-test4", merchantSchema);

module.exports = Merchant;



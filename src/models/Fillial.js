const mongoose = require("mongoose");

const fillialSchema = new mongoose.Schema(
    {
        merchant_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
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
    },
    { timestamps: true }
);


const Fillial = mongoose.model("Fillial-test6", fillialSchema);

module.exports = Fillial;

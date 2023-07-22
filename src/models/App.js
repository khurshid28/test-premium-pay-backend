const mongoose = require("mongoose");

const appSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        user_fullname: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "finished",
            enum: ["finished", "canceled"],
        },
        finished_time: {
            type: Date,
            default: Date.now,
        },
        canceled_reason: {
            type: String,
            default: null,
        },


    },
    { timestamps: true }
);


const App = mongoose.model("app-test1", appSchema);

module.exports = App;

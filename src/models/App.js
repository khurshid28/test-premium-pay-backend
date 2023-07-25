const mongoose = require("mongoose");

const appSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        merchant_id: {
            type: String,
            required: true,
        },
        fillial_id: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        middleName: {
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
            default:  () => new Date(Date.now() + 5*60*60*1000),
        },
        canceled_reason: {
            type: String,
            default: null,
        },
        


    },
    { timestamps: true }
);


const App = mongoose.model("app-test6", appSchema);

module.exports = App;

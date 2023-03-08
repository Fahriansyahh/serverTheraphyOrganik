const mongoose = require("mongoose")

const Schema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        paket: {
            type: Array,
            required: true
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("ListTheraphy", Schema)
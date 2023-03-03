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
            type: Map,
            of: {
                type: mongoose.Schema.Types.Mixed,
            },
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("ListTheraphy", Schema)
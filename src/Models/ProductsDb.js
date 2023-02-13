const mongoose = require("mongoose")
const Schema = mongoose.Schema({
    Kategori: {
        type: "string",
        required: true
    },
    Products: {
        Title: {
            type: "string",
            required: true,
        },
        image: {
            type: "string",
            required: true,
        },
        Harga: {
            type: "string",
            required: true,
        },
        Keterangan: {
            type: "string",
            required: true,
        },
        Stock: {
            type: "string",
            required: true,
        },
        Link: {
            type: "string",
            required: true
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Products", Schema)
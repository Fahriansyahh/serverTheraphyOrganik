const mongoose = require("mongoose")
const Schema = mongoose.Schema({
    User: {
        FullName: {
            type: "string",
            required: true,
        },
        Password: {
            type: "string",
            required: true,
        },
        Email: {
            type: "string",
            required: true,
        },
        NoHp: {
            type:Number,
            required: true,
        },
        Alamat: {
            type: "string",
            required: true,
        },
        Pesanan:{
            type:Array,
            required:false
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", Schema)
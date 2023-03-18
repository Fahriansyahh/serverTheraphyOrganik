const express = require('express')
const route = express.Router()
const { body } = require('express-validator')

const User=require("../Controllers/ControlUser")

route.post("/Created",[body("FullName").isUppercase().withMessage("Full Name harus huruf Besar"),body("Password").isLength({ min: 3, max: 20 }).withMessage("Password minimal 3"),body("Email").isEmail().withMessage("ini bukan email"),body("NoHp").isMobilePhone('id-ID').withMessage("Pastikan nomor hp anda +62")],User.Created)

route.get("/Auth",[body("FullName").isUppercase().withMessage("Full Name harus huruf Besar"),body("Password").isLength({ min: 3, max: 20 }).withMessage("Password minimal 3")],User.Auth)
//!update
// route.put("/update",User.Update)
module.exports = route
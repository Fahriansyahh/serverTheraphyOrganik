const express = require('express')
const route = express.Router()
const { body } = require('express-validator')

const User = require("../Controllers/ControlUser")

route.post("/Created", [body("FullName").isLength({ min: 1, max: 100 }).withMessage("Fullname tidak ada"), body("Password").isLength({ min: 3, max: 20 }).withMessage("Password minimal 3"), body("Email").isEmail().withMessage("ini bukan email"), body("NoHp").isMobilePhone('id-ID').withMessage("Pastikan nomor hp anda +62")], User.Created)

route.get("/Auth", User.Auth)
route.get("/GetById/:id", User.GetById)
route.get("/GetAll", User.GetAll)
route.put("/KeyPassword", User.KeyPassword)
route.put("/newAcount", [body("FullName").isLength({ min: 1, max: 100 }).withMessage("Fullname tidak ada"),body("Email").isEmail().withMessage("ini bukan email"), body("Password").isLength({ min: 3, max: 20 }).withMessage("Password minimal 3")], User.newAcount)
route.put("/updatePesan/:id", User.Update)
route.put("/updateUser/:id", [body("FullName").isLength({ min: 1, max: 100 }).withMessage("Fullname tidak ada"), body("Email").isEmail().withMessage("ini bukan email"), body("NoHp").isMobilePhone('id-ID').withMessage("Pastikan nomor hp anda +62")], User.updateUser)
route.delete("/DeleteById/:id", User.DeleteById)
module.exports = route

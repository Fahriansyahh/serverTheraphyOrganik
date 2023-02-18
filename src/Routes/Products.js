const express = require('express')
const { body } = require('express-validator')
const route = express.Router()
const Products = require("../Controllers/ControlProducts")

route.post("/Created", [
    body("Title").isLength({ min: 3, max: 25 }).withMessage("Title : huruf minimal 7 maximal 30"), body("Link").isURL().withMessage("Link : ini bukan link"), body("Harga").isInt().withMessage("Harga : masukan angka"), body("Stock").isInt().withMessage("Stock : masukan angka")
], Products.Create)

route.get("/getAll", Products.getAll)
route.get("/getByid/:byId", Products.getById)
route.get("/KategoryAll", Products.KategoryAll)
route.get("/kategory/:byId", Products.KategoriById)
route.delete("/deleteById/:id", Products.deleteId)
route.put("/updateById/:byId", [
    body("Title").isLength({ min: 3, max: 25 }).withMessage("Title : huruf minimal 7 maximal 30"), body("Link").isURL().withMessage("Link : ini bukan link"), body("Harga").isInt().withMessage("Harga : masukan angka"), body("Stock").isInt().withMessage("Stock : masukan angka")
], Products.updateById)

module.exports = route


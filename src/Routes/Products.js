const express = require('express')
const { body } = require('express-validator')
const route = express.Router()
const Products = require("../Controllers/ControlProducts")

route.post("/Created", [
    body("Title").isLength({ min: 3, max: 25 }).withMessage("huruf minimal 7 maximal 30")
], Products.Create)

route.get("/getAll", Products.getAll)
route.get("/getByid/:byId", Products.getById)
route.get("/kategory", Products.KategoriById)
route.delete("/deleteById/:id", Products.deleteId)


module.exports = route


const express = require('express')
const route = express.Router()
const TheraphyList = require("../Controllers/ControlListTheraphy")


route.post("/Created", TheraphyList.Created)
route.get("/GetAll", TheraphyList.getAll)
route.get("/getById/:byId", TheraphyList.getByid)
route.delete("/deleted/:id", TheraphyList.deleted)
route.put("/update/:id", TheraphyList.update)






module.exports = route
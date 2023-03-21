const express = require('express')
const app = express()
const mongoose = require('mongoose');
const multer = require('multer')
const path = require("path")
const bodyParser = require('body-parser')
const Products = require("./src/Routes/Products")
const ListTheraphy = require("./src/Routes/ListTheraphy")
const User=require("./src/Routes/User")









//! multer

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // mengarahakan destination ke file images
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        // agar nama file nya memiliki gettima dan di akahir ada original file
        cb(null, new Date().getTime() + "-" + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        // untuk mencari type nya
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg"

    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"))
app.use("/images", express.static(path.join(__dirname, "images")))
//! tutup multer

//! setup acces control
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Athorizatio');
    next();
}

app.use(allowCrossDomain)
//! tutup setup acces control
//!setup body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.json());

//! tutup setup body parser
app.use("/ListTheraphy/v1", ListTheraphy)
app.use("/Products/v1", Products)
app.use("/User/v1",User)

//! set up mongoose
mongoose.set('strictQuery', true);



// pemanngilan mongo db tidak bisa menggunakan indihome
mongoose.connect('mongodb://fahri:fahri@ac-duhqnnb-shard-00-00.zsxpnhq.mongodb.net:27017,ac-duhqnnb-shard-00-01.zsxpnhq.mongodb.net:27017,ac-duhqnnb-shard-00-02.zsxpnhq.mongodb.net:27017/Theraphy_Organic?ssl=true&replicaSet=atlas-joj2b3-shard-0&authSource=admin&retryWrites=true&w=majority')
    .then(() => { console.log("mongoDB connect") })
    .catch(() => console.log("MOngodb 404 not found"))

app.listen(4000, () => {
    console.log("open in browser")
})


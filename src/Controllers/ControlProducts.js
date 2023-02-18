

const { validationResult } = require('express-validator');
const Products = require("../Models/ProductsDb")
const path = require("path")
const fs = require("fs")
const { Error } = require('mongoose');
const sharp = require('sharp');

//! create
exports.Create = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        if (!req.file) {
            const error = { message: "input tidak ada" }
            error.errorStatus = 400
            let dat = errors.array()
            dat.push({ msg: "image tidak ada" })
            const data = { notValid: dat }
            error.data = data
            res.status(400).json({
                data: error
            })
        } else {
            const error = { message: "input tidak ada" }
            error.errorStatus = 400
            const image = req.file.path
            removeImage(image)
            const data = { notValid: errors.array() }
            error.data = data
            res.status(400).json({
                data: error
            })
        }

    }
    if (errors.isEmpty()) {
        if (!req.file) {
            const err = { message: "input tidak ada" }
            let dat = errors.array()
            dat.push({ msg: "image tidak ada" })
            const data = { notValid: dat }
            err.data = data
            res.status(400).json({
                Error: err
            })
        } else {
            //! validasi sharp
            const random = Math.floor(100000 + Math.random() * 900000);
            const source = `images/${`Products-${random}-` + req.file.originalname}`
            try {

                const images = path.join(__dirname, "../..", `${source}`)
                await sharp(req.file.path).resize(200, 200).toFile(images)
                removeImage(req.file.path)

            } catch (err) {
                console.log(err);
            }
            //!body
            const Kategori = req.body.Kategori.toLowerCase()
            const Title = req.body.Title
            const image = source
            const Harga = req.body.Harga
            const Keterangan = req.body.Keterangan
            const Stock = req.body.Stock
            const Link = req.body.Link
            //!mongose
            const Posting = new Products({
                Kategori: Kategori,
                Products: { Title: Title, image: image, Harga: Harga, Keterangan: Keterangan, Stock: Stock, Link: Link }
            })
            Posting.save().then((result) => {
                res.status(201).json({
                    message: "Create blog post succses",
                    Products: result
                })
            }).catch(err => console.log("error Create Products \n\n" + err))
            removeImage(req.file.path)
        }
    }


}

//! getAll
exports.getAll = (req, res, next) => {
    const currentPage = req.query.page || 1
    const toPage = req.query.toPage || 10
    let totalAllData;
    Products.find().countDocuments()
        .then((result) => {
            totalAllData = result
            return Products.find().skip((parseInt(currentPage) - 1) * parseInt(toPage))
                .limit(toPage)
        }).then((result) => {
            let pageNum = Math.floor(totalAllData / 10) + 1
            res.status(200).json({
                message: "get all data project",
                data: result,
                totalProject: totalAllData,
                pageNum,
                toPage: toPage,
                page: currentPage
            })
        }).catch((err) => {
            next(err)
        })
}
//!get byId
exports.getById = (req, res, next) => {
    Products.findById(req.params.byId).then(response => {
        res.status(200).json({
            message: "get success",
            Products: response
        })
    }).catch(err => {
        console.log(err)
    })
}
//!KategoriAll
exports.KategoryAll = (req, res, next) => {
    Products.find().then(response => {
        const categories = Array.from(new Set(response.map(item => item.Kategori.toLowerCase())));
        res.status(200).json({
            message: "get kategory All success",
            data: categories
        });
    });
};

//! kategori by id
exports.KategoriById = (req, res, next) => {
    const currentPage = req.query.page || 1
    const toPage = req.query.toPage || 10
    let totalAllData;
    Products.find({ Kategori: req.params.byId }).countDocuments().then(result => {
        totalAllData = result
        return Products.find({ Kategori: req.params.byId }).skip((parseInt(currentPage) - 1) * parseInt(toPage))
            .limit(toPage)
    }).then((result) => {
        let pageNum = Math.floor(totalAllData / 10) + 1
        res.status(200).json({
            message: "get all data project",
            data: result,
            totalProject: totalAllData,
            pageNum,
            toPage: toPage,
            page: currentPage
        })
    }).catch((err) => {
        next(err)
    })
}
//! delete ID
exports.deleteId = (req, res, next) => {
    const id = req.params.id
    Products.findByIdAndRemove(id)
        .then(response => {
            removeImage(response.Products.image)
            res.status(200).json({
                message: " delete success",
                response
            })
        }).catch(err => {
            console.log(err)
        })
}
//! update Byid
exports.updateById = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        if (!req.file) {
            const error = { message: "input tidak ada" }
            error.errorStatus = 400
            let dat = errors.array()
            dat.push({ msg: "image tidak ada" })
            const data = { notValid: dat }
            error.data = data
            res.status(400).json({
                data: error
            })
        } else {
            const error = { message: "input tidak ada" }
            error.errorStatus = 400
            const image = req.file.path
            removeImage(image)
            const data = { notValid: errors.array() }
            error.data = data
            res.status(400).json({
                data: error
            })
        }

    }
    if (errors.isEmpty()) {
        if (!req.file) {
            const err = { message: "input tidak ada" }
            let dat = errors.array()
            dat.push({ msg: "image tidak ada" })
            const data = { notValid: dat }
            err.data = data
            res.status(400).json({
                data: err
            })
        } else {
            //! validasi sharp
            const random = Math.floor(100000 + Math.random() * 900000);
            const source = `images/${`Products-${random}-` + req.file.originalname}`
            try {

                const images = path.join(__dirname, "../..", `${source}`)
                await sharp(req.file.path).resize(200, 200).toFile(images)
            } catch (err) {
                console.log(err);
            }
            //!body



            const Kategori = req.body.Kategori.toLowerCase()
            const Title = req.body.Title
            const image = source
            const Harga = req.body.Harga
            const Keterangan = req.body.Keterangan
            const Stock = req.body.Stock
            const Link = req.body.Link
            const id = req.params.byId
            const filter = { Kategori: Kategori, Products: { Title: Title, image: image, Harga: Harga, Keterangan: Keterangan, Stock: Stock, Link: Link } }
            Products.findByIdAndUpdate({ _id: id }, filter, { new: false }, function (err, doc) {
                if (!doc) {

                    res.json({
                        message: false,
                    })
                } else {
                    removeImage(doc.Products.image)
                    res.json({
                        message: true,
                        data: doc
                    })
                }

            })
            removeImage(req.file.path)
        }
    }


}

//!update   
removeImage = (filePathImg) => {
    filePathImg = path.join(__dirname, "../..", filePathImg)
    fs.unlink(filePathImg, err => console.log(err))
}
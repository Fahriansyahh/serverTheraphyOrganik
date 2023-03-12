const { response } = require("express");
const ListTheraphy = require("../Models/ListProductsDb");

exports.Created = (req, res, next) => {
    const title = req.body.title;
    const body = req.body.body;
    const paket = [];

    // Iterasi sebanyak 20 paket
    for (let i = 1; i <= 20; i++) {
        const harga = req.body[`harga${i}`];
        const deskripsi = req.body[`deskripsi${i}`];

        // Jika harga dan deskripsi tersedia, tambahkan ke map paket
        if (harga && deskripsi) {
            paket.push({ PilihanPaket: `paket${i}`, harga: harga, deskripsi: deskripsi });
        }
    }

    const theraphy = new ListTheraphy({ title: title, body: body, paket: paket });
    theraphy.save((err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({
                message: "Theraphy created",
                data: result,
            });
        }
    });
};


exports.getAll = (req, res, next) => {
    ListTheraphy.find().then(response => {
        res.status(200).json({
            message: "Get All Succss full",
            data: response
        })
    })
}

exports.deleted = (req, res, next) => {
    const id = req.params.id
    ListTheraphy.findByIdAndRemove(id)
        .then(response => {
            res.status(200).json({
                message: " delete success",
                response
            })
        }).catch(err => {
            console.log(err)
        })
}


exports.getByid = (req, res, next) => {
    const id = req.params.byId
    ListTheraphy.findById(id).then(response => {
        res.status(200).json({
            message: "getAllById",
            data: response
        })
    })
}


exports.update = (req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const body = req.body.body;
    //! paket ini di maksudkan langsung di kirim dan di  olah datanya di frontEnd
    const paket = req.body.paket

    let update = {};
    body ? update.body = body : false;
    title ? update.title = title : false;
    paket ? update.paket = paket : false;

    ListTheraphy.findOneAndUpdate(
        { _id: id },
        { $set: update },
        { new: false },
        function (err, doc) {
            if (err) {
                console.log("error:", err);
                res.status(400).json({
                    error: err,
                });
            } else {
                console.log("doc:", doc);
                res.status(200).json({
                    data: doc,
                });
            }
        }
    );
};

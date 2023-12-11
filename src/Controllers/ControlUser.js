const { response } = require('express');
const { validationResult } = require('express-validator');
const UserDb = require("../Models/UserDb")
const gmail = require("../Messages/GmailUser")
exports.Created = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        res.status(400).json({

            data: { message: "input value tidak sesuai", err: errors.array() }
        })
    } else {
        const FullName = req.body.FullName
        const Password = req.body.Password
        const Email = req.body.Email
        const NoHp = req.body.NoHp
        const Alamat = req.body.Alamat
        const KeyPassword = ""
        UserDb.findOne({ 'User.Email': Email, 'User.NoHp': NoHp, 'User.FullName': FullName }).then(response => {
            if (response) {
                res.status(500).json({
                    data: { err: [{ value: { FullName, Password, Email, NoHp, Alamat }, msg: "data sudah ada" }] }
                })
            } else {
                const Posting = new UserDb({
                    User: { FullName, Password, Email, NoHp: ("0" + NoHp), Alamat, KeyPassword }
                })
                Posting.save().then(response => {
                    res.status(200).json({
                        data: response
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
        })



    }
}


exports.Auth = (req, res, next) => {

    const { FullName, Password } = req.query;

    UserDb.findOne({ "User.FullName": FullName, "User.Password": Password }).then(response => {
        if (response) {
            res.status(200).json({
                data: response
            })
        } else {
            res.status(400).json({
                data: { err: [{ value: { FullName, Password }, msg: "Password Anda salah" }] }
            })
        }
    }).catch(err => {
        console.log(err)
    })
}


exports.Update = async (req, res, next) => {
    const id = req.params.id
    const Theraphy = req.body.Theraphy
    const Paket = req.body.Paket
    const Dari = req.body.Dari
    const Sampai = req.body.Sampai
    const Deskripsi = req.body.Deskripsi
    const Harga = req.body.Harga
    const Komentar = req.body.Komentar

    await UserDb.findById(id).then(response => {
        const arr = response.User.Pesanan
        const emailUser = response.User.Email
        const FullName = response.User.FullName
        const NoHP = response.User.NoHp
        const Alamat = response.User.Alamat
        if (arr.length === 0) {

            gmail.email(emailUser, gmail.Pesan(Theraphy, Paket, Harga, Dari, Sampai), "Pemesanan Threraphy Organic")
            gmail.emailAdmin(gmail.PesanAdmin(FullName, NoHP, Alamat, Theraphy, Paket, Harga, Dari, Sampai, Deskripsi, Komentar))
            const Pesanan = [{ Theraphy, Paket, Dari, Sampai, Deskripsi, Harga, Komentar }]
            UserDb.findOneAndUpdate(
                { _id: id },
                { $set: { 'User.Pesanan': Pesanan } },
                { new: false },
                function (err, doc) {
                    if (err) {
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
        } else {
            gmail.emailAdmin(gmail.PesanAdmin(FullName, NoHP, Alamat, Theraphy, Paket, Harga, Dari, Sampai, Deskripsi, Komentar))
            gmail.email(emailUser, gmail.Pesan(Theraphy, Paket, Harga, Dari, Sampai), "Pemesanan Threraphy Organic")
            const dataPesan = arr
            const PesananPush = { Theraphy, Paket, Dari, Sampai, Deskripsi, Harga, Komentar }
            dataPesan.push(PesananPush)
            UserDb.findOneAndUpdate(
                { _id: id },
                { $set: { 'User.Pesanan': dataPesan } },
                { new: false },
                function (err, doc) {
                    if (err) {
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
        }
    })
}

exports.GetById = (req, res, next) => {
    const id = req.params.id
    UserDb.findById(id).then(response => {
        res.status(200).json({
            message: "getAllById",
            data: response
        })
    })
}

exports.DeleteById = (req, res, next) => {
    const id = req.params.id
    UserDb.findByIdAndRemove(id)
        .then(response => {
            gmail.email(response.User.Email, gmail.PesanDelete(response.User.FullName, response.User.Alamat), "Akun Anda Di Blokir")
            res.status(200).json({
                message: " delete success",
                response
            })
        }).catch(err => {
            console.log(err)
        })
}

exports.GetAll = (req, res, next) => {
    UserDb.find().then(response => {
        res.status(200).json({
            message: "GetAll User",
            response
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.Search = (req, res, next) => {
    const searchQuery = req.query.q; // Assuming the search query is provided in the query parameter 'q'

    // Use a regular expression for a case-insensitive search on string fields
    const searchRegex = new RegExp(searchQuery.toString(), 'i');

    // Check if the search query is a valid number using a regex
    const isNumber = /^[0-9]+$/.test(searchQuery);

    UserDb.find({
        $or: [
            { 'User.FullName': { $regex: searchRegex } },
            { 'User.Email': { $regex: searchRegex } }, 
            { 'User.Alamat': { $regex: searchRegex } }, 
            // Handle NoHp differently if it's a valid numeric string
          
        ],
    })
        .then((data) => {
            res.status(200).json({
                response:data
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                error: err.message,
            });
        });
};




exports.GetPages=(req,res,next)=>{
    const page = req.query.page || 1; // Default to page 1 if not provided
    const pageSize = 10;
    
    UserDb.find()
        .countDocuments()  // Count total documents in the collection
        .then(totalUsers => {
            UserDb.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .then(response => {
                    const totalPages = Math.ceil(totalUsers / pageSize);

                    res.status(200).json({
                        message: `GetAll User - Page ${page}`,
                        totalUsers,
                        totalPages,
                        currentPage: page,
                        usersPerPage: pageSize,
                        response
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err.message
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err.message
            });
        });
}

exports.updateUser = (req, res, next) => {
    const errors = validationResult(req);
    const id = req.params.id
    const FullName = req.body.FullName || undefined
    const Email = req.body.Email || undefined
    const NoHp = req.body.NoHp || undefined
    const Alamat = req.body.Alamat || undefined

    if (!errors.isEmpty()) {
        res.status(400).json({
            data: {
                message: "Input value tidak sesuai",
                err: errors.array()
            }
        })
    } else {
        const updateFields = {}

        if (FullName) {
            updateFields['User.FullName'] = FullName
        }
        if (Email) {
            updateFields['User.Email'] = Email
        }
        if (NoHp) {
            updateFields['User.NoHp'] = NoHp
        }
        if (Alamat) {
            updateFields['User.Alamat'] = Alamat
        }

        UserDb.findOneAndUpdate(
            { _id: id },
            { $set: updateFields },
            { new: false },
            function (err, doc) {
                if (err) {
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
    }
}


exports.KeyPassword = (req, res, next) => {
    const Email = req.body.Email
    let Key = random()
    UserDb.findOneAndUpdate(
        { "User.Email": Email },
        { $set: { 'User.KeyPassword': Key } },
        { new: false },
        function (err, doc) {
            if (err) {
                res.status(400).json({
                    error: err,
                });
            } else {
                console.log("doc:", doc);
                if (doc === null) {
                    res.status(400).json({
                        error: "email tidak ada",
                    });
                } else {
                    gmail.email(Email, gmail.KeyPass(Key), "Authentication Code")
                    res.status(200).json({
                        data: doc,
                    });
                }

            }
        }
    );
}


exports.newAcount = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        res.status(400).json({

            data: { message: "input value tidak sesuai", err: errors.array() }
        })
    } else {
        const Key = req.body.Key
        const FullName=req.body.FullName
        const Email = req.body.Email
        const Password = req.body.Password
        UserDb.findOneAndUpdate(
            { "User.KeyPassword": Key },
            { $set: { 'User.Email': Email,'User.FullName':FullName,'User.Password': Password } },
            { new: false },
            function (err, doc) {
                if (err) {
                    res.status(400).json({
                        error: err,
                    });
                } else {
                    console.log("doc:", doc);
                    if (doc === null) {
                        const data={msg:"Code Anda Salah"}
                        let arr = errors.array()
                        arr.push(data)
                        res.status(400).json({
                            
                            data: { message: "input value tidak sesuai", err:arr }
                        })
                    } else {
                        gmail.email(Email, gmail.KeyPass(Key), "Authentication Code")
                        res.status(200).json({
                            data: doc,
                        });
                    }

                }
            }
        );
    }
}



function random() {


    for (let i = 0; i < 6; i++) {
        let text = '';
        for (let j = 0; j < 6; j++) {
            text += String.fromCharCode(Math.random() < 0.5 ? 65 + Math.floor(Math.random() * 26) : 97 + Math.floor(Math.random() * 26));
        }

        return text

    }


}
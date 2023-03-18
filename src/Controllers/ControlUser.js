const { response } = require('express');
const { validationResult } = require('express-validator');
const UserDb=require("../Models/UserDb")
exports.Created=  (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       
res.status(400).json({
   
    data:{message:"input value tidak sesuai",err:errors.array()}
})
    }else{
    const FullName=req.body.FullName
    const Password=req.body.Password
    const Email=req.body.Email
    const NoHp=req.body.NoHp
    const Alamat=req.body.Alamat

        UserDb.findOne({ 'User.Email': Email, 'User.NoHp': NoHp, 'User.FullName': FullName }).then(response => {
            if (response) {
                res.status(500).json({
                  data: { err: [{value:{FullName,Password,Email,NoHp,Alamat},msg:"datasudah ada"}] }
                })
            } else {
                const Posting = new UserDb({
                    User: { FullName, Password, Email, NoHp: ("0" + NoHp), Alamat }
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


exports.Auth=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       
res.status(400).json({
   
    data:{message:"input value tidak sesuai",err:errors.array()}
})}
else{
    const FullName=req.body.FullName
    const Password =req.body.Password

    UserDb.findOne({"User.FullName":FullName,"User.Password":Password}).then(response =>{
        if (response) {
    res.status(500).json({
              data:response
            })
        } else {
            res.status(500).json({
                data: { err: [{value:{FullName,Password},msg:"Password Anda salah"}] }
            })
        }
    }).catch(err=>{
        console.log(err)
    })
}
}
//!update
// exports.Update=(req,res,next)=>{
//     const Theraphy=req.body.Theraphy
//     const Paket=req.body.Paket
//     const Dari=req.body.data
//     const Sampai=req.body.sampai
//     const Deskripsi=req.body.deskripsi
//     const Harga=req.body.harga
//     const Komentar=req.body.komentar
// }
const { validationResult } = require('express-validator');
const UserDb=require("../Models/UserDb")
exports.Created=(req,res,next)=>{
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

    const Posting=new UserDb({
        User:{FullName,Password,Email,NoHp:("0"+NoHp),Email,Alamat}
    })
    Posting.save().then(response=>{
res.status(200).json({
    data:response
})
    }).catch(err=>{
        console.log(err)
    })
    }
}
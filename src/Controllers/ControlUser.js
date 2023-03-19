const { response } = require('express');
const { validationResult } = require('express-validator');
const UserDb=require("../Models/UserDb")
const nodemailer = require('nodemailer');
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


exports.Update=(req,res,next)=>{
const id=req.params.id
const Theraphy=req.body.Theraphy
const Paket=req.body.Paket
const Dari=req.body.Dari
const Sampai=req.body.Sampai
const Deskripsi=req.body.Deskripsi
const Harga=req.body.Harga
const Komentar=req.body.Komentar

UserDb.findById(id).then(response => {
    let arr=response.User.Pesanan
    const emailUser=response.User.Email
    const User=response.User.FullName
    const html=`
    <div>
    <h4>Kepada Pelanggan TherapyOrganic,</h4>
    <br>
    <h5>Anda Telah Memesan ${Theraphy}</h5>
    <ul>
        <li>Paket : ${Paket}</li>
        <li>Harga : ${Harga}</li>
        <li>Dari : ${Dari}</li>
        <li>Sampai : ${Sampai}</li>
    </ul>
    <br>
    <p>
    Kami dari TherapyOrganic ingin memberitahukan informasi pembayaran terkait dengan pesanan Anda. Mohon melakukan pembayaran sejumlah ${Harga} ke rekening BCA kami di bawah ini:
    </p>
    <ul>
        <li>Nomor Rekening: 6800526084</li>
        <li>Atas Nama: HAPIFA</li>
    </ul>
    <P><strong>pembayaran selain ini di luar tanggung jawab Kami </strong></P>
    <br>
    <p>Jika Anda memiliki pertanyaan atau keluhan terkait dengan pesanan Anda, jangan ragu untuk menghubungi kami di nomor telepon <a href="https://wa.me/6282299151123">082299151123</a></p>
    <br>
   
    
    <br>
    <p><i> Terima kasih atas kepercayaan Anda dalam memilih produk organic dari  TherapyOrganic.</i></p>
    <br>
    <br>
    <h4><strong>Salam Hormat,</strong></h4>
    <h4><strong>TherapyOrganic</strong></h4>
<br>
<br>

    </div>
    `
    if(arr.length === 0 ){
        
        email(emailUser,html).catch(console.error);
    const Pesanan=[{Theraphy,Paket,Dari,Sampai,Deskripsi,Harga,Komentar}]
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
}else{
email(emailUser,html).catch((err)=> console.log(err));
const dataPesan=arr
const PesananPush={Theraphy,Paket,Dari,Sampai,Deskripsi,Harga,Komentar}
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
);}
})
}

async function email(emailUser,html) {
    let transporter = nodemailer.createTransport({
host:"fahrumfahriansyah1@gmail.com",
service:"gmail",
        auth: {
        user: "fahrumfahriansyah1@gmail.com", // generated ethereal user
        pass: "fssfrudwamcallka", // generated ethereal password
      },
    });
 
    const sendMail=()=>{
        const option={
            from: 'fahrumfahriansyah1@gmail.com', // sender address
            to: emailUser, // list of receivers
            subject: "Pemesanan Produk PT TherapyOrganic", // Subject line
            html ,
        }
        transporter.sendMail(option,(err,info)=>{
            if(err)console.log(err);
            console.log("email terkirim")
        })
    }
   return sendMail()
  }
  
const nodemailer = require('nodemailer');
exports.email = (emailUser, html, subject) => {
  let transporter = nodemailer.createTransport({
    host: "theraphyorganic@gmail.com",
    service: "gmail",
    auth: {
      user: "theraphyorganic@gmail.com", // generated ethereal user
      pass: "sieojjlefuakgqnk", // generated ethereal password
    },
  });

  const sendMail = () => {
    const option = {
      from: 'theraphyorganic@gmail.com', // sender address
      to: emailUser, // list of receivers
      subject,
      html,
    }
    transporter.sendMail(option, (err, info) => {
      if (err) console.log(err);
      console.log("email terkirim")
    })
  }
  return sendMail()
}


exports.emailAdmin = (html) => {
  let transporter = nodemailer.createTransport({
    host: "theraphyorganic@gmail.com",
    service: "gmail",
    auth: {
      user: "theraphyorganic@gmail.com", // generated ethereal user
      pass: "sieojjlefuakgqnk", // generated ethereal password
    },
  });

  const sendMail = () => {
    const option = {
      from: 'theraphyorganic@gmail.com', // sender address
      to: "sliminghafifah@gmail.com,fahrumfahriansyah1@gmail.com", // list of receivers
      subject: "Pesanan User",
      html
    }
    transporter.sendMail(option, (err, info) => {
      if (err) console.log(err);
      console.log("email terkirim")
    })
  }
  return sendMail()
}







exports.Pesan = (Theraphy, Paket, Harga, Dari, Sampai) => {
  const data = `
<div>
<h4 style="color:#4CAF50;font-size:24px;">Kepada Pelanggan TherapyOrganic Yth.</h4>
<br>

<div style="background-color:#fff; border:1px solid #ccc; padding:10px;">

<h5 style="font-size:20px; margin-bottom:5px;">Anda Telah Memesan ${Theraphy}</h5>
<ul>
    <li>Paket : ${Paket}</li>
    <li>Harga : ${Harga}</li>
    <li>Dari : ${Dari}</li>
    <li>Sampai : ${Sampai}</li>
</ul>
<br>
<p>
Kami dari TherapyOrganic ingin memberitahukan informasi pembayaran terkait dengan pesanan Anda. Mohon melakukan pembayaran sejumlah ${Harga} Rupiah  ke nomor berikut  <a href="https://wa.me/6282299151123">082299151123</a>:<strong> Pastikan untuk screenshot bukti transfer dan kirimkan ke admin </strong>
</p>

<P><strong  style="font-size:19px; margin-bottom:5px;">pembayaran selain ini di luar tanggung jawab Kami </strong></P>
<br>
<p>Jika Anda memiliki pertanyaan atau keluhan terkait dengan pesanan Anda, jangan ragu untuk menghubungi kami di nomor telepon <a href="https://wa.me/6282299151123" style="font-size:18px; margin-bottom:5px;">Hafifah</a></p>
<br>
</div>

<br>
<p style="font-size:22px; margin-bottom:5px;"><i> Terima kasih atas kepercayaan Anda dalam memilih produk organic dari  TherapyOrganic.</i></p>
<br>
<br>
<div style="text-align: end;">
<h4><strong>Salam Hormat,</strong></h4>
<h4><strong>TherapyOrganic</strong></h4>
</div>
<br>
<br>

</div>
`
  return data
}





exports.PesanAdmin = (FullName, NoHP, Alamat, Theraphy, Paket, Harga, Dari, Sampai, Deskripsi, Komentar) => {
  const Hp = `https://wa.me/62${NoHP}`
  const data = `
    <div>
    <h2>Pelanggan telah Memesan</h2>
    <br>
    <ul style="background-color:#fff; border:1px solid #ccc; padding:10px;">
      <li style="list-style: none;"><strong> nama : ${FullName} </strong></li>
      <li style="list-style: none;"><a href=${Hp}><strong> noHp : 0${NoHP} </strong></a></li>
      <li style="list-style: none;"><strong> Alamat : ${Alamat} </strong></li>
      </ul>

    <h3><strong>${FullName} Telah memesan </strong> </h3>

    <ul style="background-color:#fff; border:1px solid #ccc; padding:10px;">
    <li style="list-style: none;">Theraphy : ${Theraphy}</li>
    <li style="list-style: none;">Paket : ${Paket}</li>
    <li style="list-style: none;">Harga: ${Harga}</li>
    <li style="list-style: none;">Dari : ${Dari}</li>
    <li style="list-style: none;">Sampai: ${Sampai}</li>
    <li style="list-style: none;">Deskripsi : ${Deskripsi}</li>
    <li style="list-style: none;">Komentar : ${Komentar}</li>
    </ul>

    <p>Hubungi Pembeli <a href=${Hp}><strong> ${FullName} : 0${NoHP} </strong></a></p>
   
    </div>
    `
  return data
}

exports.PesanDelete = (FullName, Alamat) => {
  const data = `
<div>
<h2>Akun Anda Telah Diblokir</h2>
<p>Kepada ${FullName},</p>
<br>
<p>dengan Alamat : ${Alamat}</p>
<br>
<div style="background-color:#fff; border:1px solid #ccc; padding:10px;">

<p>Kami ingin memberitahu Anda bahwa akun Anda telah diblokir karena pelanggaran kebijakan kami. Kami telah melakukan peninjauan atas akun Anda dan menemukan bahwa Anda telah melanggar beberapa aturan kami, sehingga kami harus mengambil tindakan yang diperlukan.</p>
<p>Jika Anda memiliki pertanyaan atau ingin membahas masalah ini lebih lanjut, silakan hubungi tim dukungan kami. <a href="https://wa.me/6282299151123">Hafifah</a> </p>

</div>
<div style="text-align: end;">
    <p>Salam,</p>
    <p>Theraphy Organik</p>
    </div>

</div>
`
  return data
}

exports.KeyPass = (Key) => {
  const data = `
  <h1 style="color:#4CAF50;">Gmail Therapy Organik</h1>
		<p>Salam,</p>
		<p>Ini adalah pesan autentikasi kode untuk memastikan perubahan password akun Gmail Therapy Organik Anda:</p>
		<div style="background-color:#fff; border:1px solid #ccc; padding:10px;">
			<p style="font-size:18px; margin-bottom:5px;">Kode Autentikasi: <strong>${Key}</strong></p>
			<p style="font-size:14px; margin-top:5px;">Harap masukkan kode autentikasi ini pada halaman verifikasi untuk memastikan perubahan password.</p>
		</div>
		<p>Jangan berikan kode ini kepada siapa pun, termasuk pihak Gmail Therapy Organik. </p>
  `
  return data
}


const nodemailer = require('nodemailer');

async function emailPassword(user, password) {
  const { name, email } = user;
  const mailOptions = {
    from: process.env.GMAIL_USERNAME, // sender address
    to: email, // list of receivers
    subject: '[Action Required!] Welcome to E3VIS!', // Subject line
    text: `Your password is ${password}. Please change your password!`,
    html: `
    <p>
      <p>Hello ${name},</p>
      <br/>
      <br/>
      <p>Welcome to NTU EEE!</p>
      <p>E3VIS is a platform created by students to better integrate EEE and IEM undergraduates into University life. 
      As part of mentoring system, you are required to download the application at https://e3vis.x-dream.tech/main. We have also created an account on your behalf.</p>
      <p>Your password is <strong>${password}</strong>. </p>
      <p>As this is a randomly generated password, please login and change your password immediately! 
      Do contact <a href = "mailto:praw0001@e.ntu.edu.sg?subject=Issues with E3VIS">our administrator</a> if you need any assistance.</p>
      <br/>
      <p>Once again, we welcome you. All the best for your endeavour in NTU!</p>
      <br/>
      <br/>
      <p>E3VIS</p>
    </p>`
  };
  return new Promise((resolve, reject) => {
    try {
      //create transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // service: 'gmail',
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD
        }
      });
      //send mail
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          reject(err);
        }
        else
          console.log(info);
        transporter.close();
        resolve(1);
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = emailPassword;
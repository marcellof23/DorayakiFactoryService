import fs from 'fs';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';

const Mailer = async (email, data) => {
  const template = fs.readFileSync('./src/templates/email.html', 'utf8');


  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    },
    requireTLS: true
  }
  console.log(config.auth)

  const transporter = nodemailer.createTransport(config);

  const html = handlebars.compile(template)(data);

  const mail = {
    to: email,
    from: `Yoshiyaki Store <${process.env.EMAIL}>`,
    subject: 'New Dorayaki Request',
    html,
  }

  await transporter.sendMail(mail)
}

export default Mailer;
const nodemailer = require("nodemailer");

const mailgun = require("nodemailer-mailgun-transport");
require("dotenv").config();

const auth = {
  auth: {
    api_key: process.env.MAILGUN_APIKEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailgun(auth));

const sendMail = (fname, lname, email, body, cb) => {
  const mailOptions = {
    from: email,
    to: "mark@markentrekin.com",
    subject: "New Message from MarkEntrekin.com",
    text: `${lname}, ${fname}
    ${body}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendMail;

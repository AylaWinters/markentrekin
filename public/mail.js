const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "fb27bff36d26085218756be40a33d269-87c34c41-93da57a1",
    domain: "sandbox8551a8e2c94c4bc68f8a8eebc1353ac3.mailgun.org",
  },
};

const transporter = nodemailer.createTransport(mailgun(auth));

const sendMail = (fname, lname, email, body, cb) => {
  const mailOptions = {
    from: email,
    to: "andre.entrekin@gmail.com",
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

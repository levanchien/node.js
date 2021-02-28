const nodemailer = require("nodemailer");

module.exports.transporter = (service) => {
  switch (service) {
    case 'gmail':
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: "OAuth2",
          user: process.env.GMAIL_EMAIL,
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          accessToken: process.env.GMAIL_ACCESS_TOKEN
        },
      });
  }
}


const nodemailer = require("nodemailer");

module.exports.transporter = (service) => {
  switch (service) {
    case 'gmail':
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: "OAuth2",
          user: process.env.MAIL_EMAIL,
          clientId: " levanchien",
          clientSecret: "levanchien",
          refreshToken: "1//04IsxjtJPBH9dCgYIARAAGAQSNwF-L9Ir_KPQ-ErdosadsaasdadasddsadadadadtgJA8SLSb0k_6vM_aiFgXQkI1zXfXl3fRCQaDrdOFPqD14jGwchh01_GqU",
          accessToken: "ya29.A0AfH6SMAUHSAgfDHjiW-cNru8fvnmcrZCfZZLaUcvfw54kxmOvO_xBmw3LFQKLmZJDVW_4i6-MVPugBEx5reTK918kSthejOXwoTdx6GejaAP-DHPWRq3HAp04e8CwfnBqfPZvx6HaOVOx4S0PWjfX1EbPmA5" //access token variable we defined earlier
        },
      });
  }
}


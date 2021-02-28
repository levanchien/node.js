require('dotenv').config();
const mailService = require('./services/mail/mail.service');

async function main() {
    try {
        const result = await mailService.sendByGmail();
        console.log(result);
    } catch (e) {
        console.error(e);
    }
}

main();

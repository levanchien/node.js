const { transporter } = require('./mail.config');

module.exports.sendByGmail = () => {
    return transporter('gmail').sendMail({
        from: '"Fred Foo 👻" <xxx@xxx.com>', // sender address
        to: "yyy@yyy.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
}

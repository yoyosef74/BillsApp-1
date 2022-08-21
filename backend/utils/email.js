const nodemailer = require('nodemailer');
const sendEmail = async options => {
        var transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                 user: process.env.EMAIL_USERNAME,
                 pass: process.env.EMAIL_PASSWORD
            }
    });
    //2Define email options
    const emailOptions = {
        from: 'Abdullah <hello@jonas.io>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        //html:

    }
    //3 send the email
   await transporter.sendMail(emailOptions);
}

module.exports = sendEmail
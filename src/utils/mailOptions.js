const { createTransport } = require('nodemailer');
const { loggerError, logger } = require('../utils/logger');

async function handleSubmitMail(mailOptions) {

    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail(mailOptions);
        logger.info('Email enviado correctamente');
    } catch (err) {
        loggerError.error(err);
    }
}

module.exports = handleSubmitMail;
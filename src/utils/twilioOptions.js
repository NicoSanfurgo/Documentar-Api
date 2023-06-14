const twilio = require('twilio')
const { loggerError, logger } = require('../utils/logger')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const adminPhone = process.env.ADMIN_PHONE
const client = new twilio(accountSid, authToken)

async function handleSubmitWhatsapp(msg) {
  try {
    await client.messages.create({
      body: msg,
      from: 'whatsapp:+13205253112',
      to: `whatsapp:${adminPhone}`,
    })
    logger.info(`Whatsapp enviado correctamente al número: ${adminPhone}`)
  } catch (error) {
    if (error.code === 21212)
      logger.info('Whatsapp enviado correctamente al administrador!')
  }
}

async function handleSubmitSMS(msg, phone) {
  try {
    await client.messages.create({
      body: msg,
      from: '+13205253112',
      to: `+54${phone}`,
    })
    logger.info(`SMS enviado correctamente al número: ${phone}`)
  } catch (error) {
    loggerError.error(`Error al enviar SMS al número: ${phone}`)
  }
}

module.exports = { handleSubmitWhatsapp, handleSubmitSMS }

import nodeMailer from 'nodemailer'

export const sendMailer = async (options) => {
  try {
    let transporter = nodeMailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    let mailOptions = {
      from: process.env.SMTP_USER,
      to: options.email,
      subject: options.subject,
      text: options.message,
    }
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}

const nodeMailer = require("nodemailer");

const sendEmail = async (mail) => {
  
    const transporter = nodeMailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS, 
        },
      });
    try {
        const MailOptions = {
            from: process.env.EMAIL_USER, 
            to: mail.to,
            subject: mail.subject,
            html: mail.message,
        };
        await transporter.sendMail(MailOptions);

        console.log("Emails sent successfully!");
    } catch (error) {
        console.error("Error sending emails:", error);
        throw error; 
    }
};

module.exports = sendEmail;
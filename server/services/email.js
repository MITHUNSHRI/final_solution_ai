const nodemailer = require('nodemailer');

const sendOutboundEmail = async (to, subject, body) => {
    try {
        console.log(`Preparing to send email to ${to}...`);

        // Ethereal is a free dummy SMTP service for development and testing.
        // It catches emails instead of sending them to real inboxes, ensuring we don't spam.
        // For production, this gets replaced by standard SMTP (SendGrid, Outlook, Gmail, etc.)

        // 1. Generate a test account (only needed if you don't provide your own credentials)
        let testAccount = await nodemailer.createTestAccount();

        // 2. Create the transporter using either ENV vars or the test account
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.ethereal.email',
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true' || false,
            auth: {
                user: process.env.SMTP_USER || testAccount.user,
                pass: process.env.SMTP_PASS || testAccount.pass,
            },
        });

        // 3. Send the email
        const mailOptions = {
            from: process.env.EMAIL_FROM || '"Aura AI Sales" <alex@aura-ai.io>',
            to: to,
            subject: subject,
            text: body, // Plain text body
            html: `<p>${body.replace(/\n/g, '<br>')}</p>`, // Basic HTML conversion for convenience
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`Email Sent Successfully! Message ID: ${info.messageId}`);

        // If using the dummy Ethereal service, it provides a URL to view the sent email
        if (!process.env.SMTP_HOST) {
            console.log(`View your fake delivered email here: ${nodemailer.getTestMessageUrl(info)}`);
        }

        return { success: true };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error: 'SMTP connection failed. Check server logs.' };
    }
};

module.exports = {
    sendOutboundEmail
};

const nodemailer = require('nodemailer');

const sendOutboundEmail = async (to, subject, body) => {
    console.log(`>>> EMAIL SERVICE CALLED: To=${to}, Subject=${subject}`);
    try {

        // Ethereal is a free dummy SMTP service for development and testing.
        // It catches emails instead of sending them to real inboxes, ensuring we don't spam.
        // For production, this gets replaced by standard SMTP (SendGrid, Outlook, Gmail, etc.)

        // Check if environment variables are set. If not, fallback to Ethereal but log a warning.
        const isDefaultConfig = !process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com';

        if (isDefaultConfig) {
            console.warn('WARNING: Missing SMTP configuration in .env - falling back to Ethereal dummy service.');
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.ethereal.email',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER || (await nodemailer.createTestAccount()).user,
                pass: process.env.SMTP_PASS || (await nodemailer.createTestAccount()).pass,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM || '"Aura AI Sales" <noreply@aura-ai.io>',
            to: to,
            subject: subject,
            text: body,
            html: `<p>${body.replace(/\n/g, '<br>')}</p>`,
        };

        console.log('Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        if (isDefaultConfig) {
            const previewUrl = nodemailer.getTestMessageUrl(info);
            console.log(`View your dummy delivered email here: ${previewUrl}`);
            return { success: true, dummy: true, previewUrl };
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

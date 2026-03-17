const nodemailer = require('nodemailer');

const sendOutboundEmail = async (to, subject, body) => {
    console.log(`>>> EMAIL SERVICE CALLED: To=${to}, Subject=${subject}`);
    try {

        // Ethereal is a free dummy SMTP service for development and testing.
        // It catches emails instead of sending them to real inboxes, ensuring we don't spam.
        // For production, this gets replaced by standard SMTP (SendGrid, Outlook, Gmail, etc.)

        // Improved validation and robustness
        const smtpHost = (process.env.SMTP_HOST || 'smtp.ethereal.email').trim();
        const smtpPort = Number(process.env.SMTP_PORT) || 587;
        const smtpSecure = process.env.SMTP_SECURE === 'true';
        const smtpUser = (process.env.SMTP_USER || '').trim();
        const smtpPass = (process.env.SMTP_PASS || '').trim();

        const isDefaultConfig = !smtpUser || smtpUser === 'your-email@gmail.com';

        if (isDefaultConfig) {
            console.warn('WARNING: Using fallback/test SMTP account.');
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
                user: smtpUser || (await nodemailer.createTestAccount()).user,
                pass: smtpPass || (await nodemailer.createTestAccount()).pass,
            },
            connectionTimeout: 10000, // 10 seconds timeout
            greetingTimeout: 10000,
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM || `"Aura AI Sales" <${smtpUser || 'noreply@aura-ai.io'}>`,
            to: to,
            subject: subject,
            text: body,
            html: `<p>${body.replace(/\n/g, '<br>')}</p>`,
        };

        console.log(`Connecting to SMTP: ${smtpHost}:${smtpPort} (Secure: ${smtpSecure})...`);
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        if (isDefaultConfig && !smtpUser) {
            const previewUrl = nodemailer.getTestMessageUrl(info);
            console.log(`View your dummy delivered email here: ${previewUrl}`);
            return { success: true, dummy: true, previewUrl };
        }

        return { success: true };
    } catch (error) {
        console.error('CRITICAL SMTP ERROR:', error.message);
        if (error.code === 'ECONNREFUSED') {
            return { success: false, error: `Connection refused by ${process.env.SMTP_HOST}. Is the port/secure setting correct?` };
        }
        return { success: false, error: `Email failed: ${error.message}` };
    }
};

module.exports = {
    sendOutboundEmail
};

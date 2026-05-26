import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter = null;

const getTransporter = () => {
  if (!env.smtp.user || !env.smtp.pass) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: false,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass,
      },
    });
  }
  return transporter;
};

export const sendContactNotification = async ({ name, email, subject, message }) => {
  const transport = getTransporter();
  if (!transport) {
    console.warn('SMTP not configured — skipping email notification.');
    return { sent: false, reason: 'smtp_not_configured' };
  }

  const html = `
    <h2>New portfolio contact message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;

  await transport.sendMail({
    from: `"Portfolio Contact" <${env.smtp.user}>`,
    to: env.notifyEmail,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html,
    text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
  });

  return { sent: true };
};

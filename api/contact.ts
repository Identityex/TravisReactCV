import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const CONTACT_MESSAGE_FIELDS: { [key: string]: string } = {
  name: 'Name',
  email: 'Email',
  subject: 'Subject',
  message: 'Message',
};

const generateEmailContent = (data: { [key: string]: string }) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) => 
      str + `${CONTACT_MESSAGE_FIELDS[key] || key}: \n${val} \n \n`,
    ''
  );
  const htmlData = Object.entries(data).reduce(
    (str, [key, val]) => 
      str + `<h3>${CONTACT_MESSAGE_FIELDS[key] || key}</h3><p>${val.replace(/\n/g, '<br>')}</p>`,
    ''
  );

  return {
    text: stringData,
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>New Contact Form Submission</title>
        <meta charset="utf-8"/>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h2 { color: #6366f1; }
          h3 { color: #1e293b; margin-top: 20px; }
          p { margin: 10px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Contact Form Submission</h2>
          ${htmlData}
          <div class="footer">
            <p>This message was sent from your portfolio contact form.</p>
          </div>
        </div>
      </body>
    </html>`,
  };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body;

  // Basic validation
  if (!data || !data.name || !data.email || !data.message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Honeypot check (if bot fills this field, reject)
  if (data.honeypot) {
    return res.status(200).json({ message: 'Thank you for your message!' });
  }

  try {
    // Create transporter based on email service
    let transporter;
    
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Generic SMTP configuration
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      // Gmail configuration
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
    } else {
      throw new Error('Email configuration not found');
    }

    const { text, html } = generateEmailContent(data);

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      replyTo: `${data.name} <${data.email}>`,
      subject: data.subject || 'New Contact Form Submission',
      text,
      html,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
}
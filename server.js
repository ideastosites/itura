import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ultra-clean HTML email template
const generateEmailTemplate = (data) => {
  const { name, email, firm, notes, source, job_title, phone, country, investment_type } = data;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>ITURA - New Inquiry</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #F0F8FF; margin: 0; padding: 40px 20px; color: #0A0A0A;">
        <div style="max-w: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #D8E5F2;">
          <!-- Header -->
          <div style="background-color: #6B0E1E; padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: normal; letter-spacing: 2px;">
              ITURA
            </h1>
            <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.8); font-size: 12px; letter-spacing: 4px; text-transform: uppercase;">
              New ${source}
            </p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #D8E5F2;">
                  <strong style="color: #6B0E1E; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Full Name</strong><br/>
                  <span style="font-size: 16px; color: #324150;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #D8E5F2;">
                  <strong style="color: #6B0E1E; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Email Address</strong><br/>
                  <a href="mailto:${email}" style="font-size: 16px; color: #18047b; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #D8E5F2;">
                  <strong style="color: #6B0E1E; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Phone</strong><br/>
                  <span style="font-size: 16px; color: #324150;">${phone}</span>
                </td>
              </tr>
              ` : ''}
              ${firm ? `
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #D8E5F2;">
                  <strong style="color: #6B0E1E; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Company / Firm</strong><br/>
                  <span style="font-size: 16px; color: #324150;">${firm}</span>
                </td>
              </tr>
              ` : ''}
              ${job_title ? `
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #D8E5F2;">
                  <strong style="color: #6B0E1E; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Job Title</strong><br/>
                  <span style="font-size: 16px; color: #324150;">${job_title}</span>
                </td>
              </tr>
              ` : ''}
              ${country ? `
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #D8E5F2;">
                  <strong style="color: #6B0E1E; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Country</strong><br/>
                  <span style="font-size: 16px; color: #324150;">${country}</span>
                </td>
              </tr>
              ` : ''}
              ${investment_type ? `
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #D8E5F2;">
                  <strong style="color: #6B0E1E; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Investment Type</strong><br/>
                  <span style="font-size: 16px; color: #324150;">${investment_type}</span>
                </td>
              </tr>
              ` : ''}
              ${notes ? `
              <tr>
                <td style="padding: 15px 0;">
                  <strong style="color: #6B0E1E; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Notes / Inquiry</strong><br/>
                  <div style="font-size: 14px; color: #324150; line-height: 1.6; margin-top: 5px; background: #F0F8FF; padding: 15px; border-left: 3px solid #D4AF37;">
                    ${notes.replace(/\n/g, '<br/>')}
                  </div>
                </td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #0A0A0A; padding: 20px; text-align: center;">
            <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 1px;">
              Automated securely via ITURA API Portal
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// API Route for Contact Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, firm, notes, website_url, source, job_title, phone, country, investment_type } = req.body;

    // 1. HONEYPOT VALIDATION (Bot Protection)
    // If the hidden 'website_url' field has any value, silently drop the request
    if (website_url) {
      console.warn('Bot detected via honeypot field. Silently rejecting.');
      // Deceptive 200 OK
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    // 2. BASIC VALIDATION
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }

    // 3. ROUTE EMAIL BASED ON SOURCE
    let toEmail = process.env.CONTACT_EMAIL || 'info@ituraafrica.com';
    if (source === 'Investor Inquiry' || source === 'Investor Deck Request' || source === 'Brand Participation (Join ITURA)') {
      toEmail = 'brands@ituraafrica.com';
    }

    // 4. NODEMAILER CONFIGURATION
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 5. EMAIL OPTIONS
    const mailOptions = {
      from: `"ITURA Portal" <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `[ITURA Portal] New ${source} from ${name}`,
      html: generateEmailTemplate({ name, email, firm, notes, source, job_title, phone, country, investment_type }),
    };

    // 5. SEND EMAIL
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
});

// Serve static files from the React frontend build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by serving the React app
app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend API running securely on port ${PORT}`);
});

import { Resend } from 'resend';

const REQUIRED_FIELDS = ['fullName', 'email', 'phone', 'serviceType', 'message'];

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');

const toSafeText = (value) => String(value ?? '').trim();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_BOOKING_FROM || 'KRB Facilities Management <no-reply@krbfm.co.uk>';
  const adminEmail = process.env.BOOKING_ADMIN_EMAIL || 'krbfm194@gmail.com';

  if (!resendApiKey) {
    return res.status(500).json({ message: 'Email service is not configured. Missing RESEND_API_KEY.' });
  }

  let body = {};

  if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body || '{}');
    } catch {
      return res.status(400).json({ message: 'Invalid request payload.' });
    }
  } else {
    body = req.body || {};
  }

  const payload = {
    fullName: toSafeText(body.fullName),
    email: toSafeText(body.email),
    phone: toSafeText(body.phone),
    serviceType: toSafeText(body.serviceType),
    message: toSafeText(body.message),
  };

  const missingField = REQUIRED_FIELDS.find((field) => !payload[field]);
  if (missingField) {
    return res.status(400).json({ message: `Missing required field: ${missingField}` });
  }

  if (!isValidEmail(payload.email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  const resend = new Resend(resendApiKey);

  const customerHtml = `
    <div style="font-family:Arial, sans-serif; color:#1e293b; line-height:1.6;">
      <h2 style="color:#0e4c78; margin-bottom:8px;">Message Received</h2>
      <p>Hi ${escapeHtml(payload.fullName)},</p>
      <p>Thank you for contacting KRB Facilities Management. We have received your message and we will get back to you shortly.</p>
      <p><strong>Service Type:</strong> ${escapeHtml(payload.serviceType)}</p>
      <p><strong>Your Message:</strong><br />${escapeHtml(payload.message)}</p>
      <p>Kind regards,<br />KRB Facilities Management</p>
    </div>
  `;

  const adminHtml = `
    <div style="font-family:Arial, sans-serif; color:#1e293b; line-height:1.6;">
      <h2 style="color:#0e4c78; margin-bottom:8px;">New Contact Form Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Service Type:</strong> ${escapeHtml(payload.serviceType)}</p>
      <p><strong>Message:</strong><br />${escapeHtml(payload.message)}</p>
    </div>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: [payload.email],
        subject: 'We received your message - KRB Facilities Management',
        html: customerHtml,
        replyTo: adminEmail,
      }),
      resend.emails.send({
        from: fromEmail,
        to: [adminEmail],
        subject: `New contact form message: ${payload.fullName}`,
        html: adminHtml,
        replyTo: payload.email,
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to send contact email.';
    return res.status(500).json({ message });
  }
}

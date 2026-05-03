import { Resend } from 'resend';

const REQUIRED_FIELDS = [
  'fullName', 'email', 'phone', 'postcode', 'preferredContactMethod',
  'serviceRequired', 'preferredDate', 'preferredTime', 'serviceAddress',
  'townCity', 'propertyType', 'urgency', 'estimatedBudget',
  'accessDetails', 'parkingInfo', 'materialsSupplied',
  'workDescription', 'preferredOutcome',
];

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

  const resendApiKey = process.env.RESEND_API_KEY || 're_9X3UQJxH_LivNe6cShBGupMueHGPeeU8L';
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
    postcode: toSafeText(body.postcode),
    companyName: toSafeText(body.companyName),
    preferredContactMethod: toSafeText(body.preferredContactMethod),
    serviceRequired: toSafeText(body.serviceRequired),
    preferredDate: toSafeText(body.preferredDate),
    preferredTime: toSafeText(body.preferredTime),
    serviceAddress: toSafeText(body.serviceAddress),
    townCity: toSafeText(body.townCity),
    propertyType: toSafeText(body.propertyType),
    urgency: toSafeText(body.urgency),
    estimatedBudget: toSafeText(body.estimatedBudget),
    accessDetails: toSafeText(body.accessDetails),
    parkingInfo: toSafeText(body.parkingInfo),
    materialsSupplied: toSafeText(body.materialsSupplied),
    petsOnSite: Boolean(body.petsOnSite),
    addOns: Array.isArray(body.addOns) ? body.addOns.map((item) => toSafeText(item)).filter(Boolean) : [],
    workDescription: toSafeText(body.workDescription),
    preferredOutcome: toSafeText(body.preferredOutcome),
  };

  const missingField = REQUIRED_FIELDS.find((field) => !payload[field]);
  if (missingField) {
    return res.status(400).json({ message: `Missing required field: ${missingField}` });
  }

  if (!isValidEmail(payload.email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  const resend = new Resend(resendApiKey);

  const buildRow = (label, value) => `
    <tr>
      <td style="padding:10px 12px;border:1px solid #dbe4ee;background:#f8fafc;font-weight:700;color:#0e4c78;width:200px;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border:1px solid #dbe4ee;color:#334155;">${escapeHtml(String(value || 'N/A'))}</td>
    </tr>`;

  const detailsTable = `
    <table style="border-collapse:collapse;width:100%;max-width:700px;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;">
      <tbody>
        ${buildRow('Full name', payload.fullName)}
        ${buildRow('Email', payload.email)}
        ${buildRow('Phone', payload.phone)}
        ${buildRow('Postcode', payload.postcode)}
        ${buildRow('Company name', payload.companyName || 'Not provided')}
        ${buildRow('Preferred contact method', payload.preferredContactMethod)}
        ${buildRow('Service required', payload.serviceRequired)}
        ${buildRow('Preferred date', payload.preferredDate)}
        ${buildRow('Preferred time', payload.preferredTime)}
        ${buildRow('Service address', payload.serviceAddress)}
        ${buildRow('Town / City', payload.townCity)}
        ${buildRow('Property type', payload.propertyType)}
        ${buildRow('Urgency', payload.urgency)}
        ${buildRow('Estimated budget', payload.estimatedBudget)}
        ${buildRow('Access details', payload.accessDetails)}
        ${buildRow('Parking info', payload.parkingInfo)}
        ${buildRow('Materials supplied', payload.materialsSupplied)}
        ${buildRow('Pets on-site', payload.petsOnSite ? 'Yes' : 'No')}
        ${buildRow('Add-ons', payload.addOns.length ? payload.addOns.join(', ') : 'None selected')}
        ${buildRow('Work description', payload.workDescription)}
        ${buildRow('Preferred outcome', payload.preferredOutcome)}
      </tbody>
    </table>`;

  const customerHtml = `
    <div style="font-family:Arial, sans-serif; color:#1e293b; line-height:1.6;">
      <h2 style="color:#0e4c78; margin-bottom:8px;">Message Received</h2>
      <p>Hi ${escapeHtml(payload.fullName)},</p>
      <p>Thank you for contacting KRB Facilities Management. We have received your message and will get back to you shortly.</p>
      <p>Here is a summary of what you sent:</p>
      ${detailsTable}
      <p style="margin-top:18px;">Kind regards,<br />KRB Facilities Management</p>
    </div>
  `;

  const adminHtml = `
    <div style="font-family:Arial, sans-serif; color:#1e293b; line-height:1.6;">
      <h2 style="color:#0e4c78; margin-bottom:8px;">New Contact Form Message</h2>
      <p>A customer has submitted the contact form on krbfm.co.uk.</p>
      ${detailsTable}
    </div>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: [payload.email],
        subject: `We received your message - ${payload.serviceRequired}`,
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

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

  const emailShell = (preheader, bodyContent) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(preheader)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.10);">
        <!-- Header -->
        <tr>
          <td style="background:#07273f;padding:28px 36px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="vertical-align:middle;">
                <span style="font-size:28px;font-weight:900;color:#59b947;letter-spacing:-1px;font-family:Arial,sans-serif;">KRB</span>
                <span style="font-size:11px;font-weight:700;color:#ffffff;margin-left:10px;letter-spacing:0.18em;text-transform:uppercase;font-family:Arial,sans-serif;">Facilities Management</span>
              </td>
            </tr></table>
            <p style="margin:10px 0 0;color:rgba(255,255,255,0.45);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;font-family:Arial,sans-serif;">${escapeHtml(preheader)}</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 36px 28px;">
            ${bodyContent}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;border-top:2px solid #e2e8f0;padding:22px 36px;">
            <p style="margin:0;font-size:12px;color:#94a3b8;line-height:2;font-family:Arial,sans-serif;">
              KRB Facilities Management &nbsp;&bull;&nbsp;
              <a href="https://krbfm.co.uk" style="color:#1b9ce5;text-decoration:none;">krbfm.co.uk</a>
              &nbsp;&bull;&nbsp;
              <a href="tel:03335772280" style="color:#1b9ce5;text-decoration:none;">0333 577 2280</a>
              &nbsp;&bull;&nbsp;
              <a href="mailto:info@krbfm.co.uk" style="color:#1b9ce5;text-decoration:none;">info@krbfm.co.uk</a>
            </p>
            <p style="margin:4px 0 0;font-size:11px;color:#cbd5e1;font-family:Arial,sans-serif;">Serving Croydon, Purley, Thornton Heath, Coulsdon &amp; South London</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const customerHtml = emailShell(
    'Message Received',
    `<h2 style="margin:0 0 16px;font-size:22px;font-weight:900;color:#07273f;font-family:Arial,sans-serif;">Your message has been received</h2>
     <p style="margin:0 0 10px;font-size:15px;color:#334155;font-family:Arial,sans-serif;">Hi ${escapeHtml(payload.fullName)},</p>
     <p style="margin:0 0 10px;font-size:15px;color:#334155;font-family:Arial,sans-serif;">Thank you for contacting <strong>KRB Facilities Management</strong>. We've received your message and a member of our team will be in touch within a few hours.</p>
     <p style="margin:0 0 20px;font-size:15px;color:#334155;font-family:Arial,sans-serif;">Here's a copy of what you sent us:</p>
     ${detailsTable}
     <p style="margin:24px 0 0;font-size:14px;color:#64748b;font-family:Arial,sans-serif;">Kind regards,<br /><strong style="color:#07273f;">The KRB Team</strong></p>`
  );

  const adminHtml = emailShell(
    'New Contact Form Submission',
    `<h2 style="margin:0 0 6px;font-size:22px;font-weight:900;color:#07273f;font-family:Arial,sans-serif;">New Contact Form Message</h2>
     <p style="margin:0 0 20px;font-size:14px;color:#64748b;font-family:Arial,sans-serif;">Submitted via krbfm.co.uk</p>
     <div style="background:#fff7ed;border-left:4px solid #59b947;border-radius:4px;padding:14px 16px;margin-bottom:24px;">
       <p style="margin:0;font-size:14px;color:#334155;font-family:Arial,sans-serif;"><strong>From:</strong> ${escapeHtml(payload.fullName)} &mdash; <a href="mailto:${escapeHtml(payload.email)}" style="color:#1b9ce5;text-decoration:none;">${escapeHtml(payload.email)}</a> &mdash; <a href="tel:${escapeHtml(payload.phone)}" style="color:#1b9ce5;text-decoration:none;">${escapeHtml(payload.phone)}</a></p>
     </div>
     ${detailsTable}`
  );

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

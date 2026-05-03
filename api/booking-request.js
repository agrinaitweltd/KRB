import { Resend } from 'resend';

const REQUIRED_FIELDS = [
  'fullName',
  'email',
  'phone',
  'postcode',
  'preferredContactMethod',
  'serviceRequired',
  'preferredDate',
  'preferredTime',
  'serviceAddress',
  'townCity',
  'propertyType',
  'urgency',
  'estimatedBudget',
  'accessDetails',
  'parkingInfo',
  'materialsSupplied',
  'workDescription',
  'preferredOutcome',
];

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');

const toSafeText = (value) => String(value ?? '').trim();

const createLine = (label, value) => `
  <tr>
    <td style="padding:10px 12px; border:1px solid #dbe4ee; background:#f8fafc; font-weight:700; color:#0e4c78; width:220px;">${escapeHtml(label)}</td>
    <td style="padding:10px 12px; border:1px solid #dbe4ee; color:#334155;">${escapeHtml(value || 'N/A')}</td>
  </tr>
`;

const buildEmailTable = (payload) => {
  return `
    <table style="border-collapse:collapse; width:100%; max-width:700px; font-family:Arial, sans-serif; font-size:14px; line-height:1.5;">
      <tbody>
        ${createLine('Full name', payload.fullName)}
        ${createLine('Email', payload.email)}
        ${createLine('Phone', payload.phone)}
        ${createLine('Postcode', payload.postcode)}
        ${createLine('Company name', payload.companyName || 'Not provided')}
        ${createLine('Preferred contact method', payload.preferredContactMethod)}
        ${createLine('Service required', payload.serviceRequired)}
        ${createLine('Preferred date', payload.preferredDate)}
        ${createLine('Preferred time', payload.preferredTime)}
        ${createLine('Service address', payload.serviceAddress)}
        ${createLine('Town / City', payload.townCity)}
        ${createLine('Property type', payload.propertyType)}
        ${createLine('Urgency', payload.urgency)}
        ${createLine('Estimated budget', payload.estimatedBudget)}
        ${createLine('Access details', payload.accessDetails)}
        ${createLine('Parking info', payload.parkingInfo)}
        ${createLine('Materials supplied', payload.materialsSupplied)}
        ${createLine('Pets on-site', payload.petsOnSite ? 'Yes' : 'No')}
        ${createLine('Optional add-ons', payload.addOns.length ? payload.addOns.join(', ') : 'None selected')}
        ${createLine('Work description', payload.workDescription)}
        ${createLine('Preferred outcome', payload.preferredOutcome)}
      </tbody>
    </table>
  `;
};

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
  const detailsTable = buildEmailTable(payload);

  const customerHtml = `
    <div style="font-family:Arial, sans-serif; color:#1e293b; line-height:1.6;">
      <h2 style="color:#0e4c78; margin-bottom:8px;">Booking Request Received</h2>
      <p>Hi ${escapeHtml(payload.fullName)},</p>
      <p>Thanks for booking with KRB Facilities Management. We have received your request and our team will review it shortly.</p>
      <p>Here is a summary of what you sent:</p>
      ${detailsTable}
      <p style="margin-top:18px;">We will reply with availability and pricing as soon as possible.</p>
      <p>Kind regards,<br />KRB Facilities Management</p>
    </div>
  `;

  const adminHtml = `
    <div style="font-family:Arial, sans-serif; color:#1e293b; line-height:1.6;">
      <h2 style="color:#0e4c78; margin-bottom:8px;">New Booking Request</h2>
      <p>A customer has submitted a new booking request via krbfm.co.uk.</p>
      ${detailsTable}
    </div>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: [payload.email],
        subject: `We received your booking request - ${payload.serviceRequired}`,
        html: customerHtml,
        replyTo: adminEmail,
      }),
      resend.emails.send({
        from: fromEmail,
        to: [adminEmail],
        subject: `New booking request: ${payload.serviceRequired} (${payload.fullName})`,
        html: adminHtml,
        replyTo: payload.email,
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to send booking email.';
    return res.status(500).json({ message });
  }
}

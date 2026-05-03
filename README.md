# KRB

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/550786f9-3a10-4d3b-9117-b892694bdd4f

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Booking Email Setup (Resend + Vercel)

The booking form now sends two emails whenever a customer submits a request:

1. Confirmation email to the customer.
2. Full booking details email to the admin inbox.

Serverless endpoint: `/api/booking-request`

Set these environment variables in Vercel Project Settings -> Environment Variables:

- `RESEND_API_KEY`
- `RESEND_BOOKING_FROM` (example: `KRB Facilities Management <bookings@krbfm.co.uk>`)
- `BOOKING_ADMIN_EMAIL` (inbox to receive booking notifications)

For local development, place the same variables in `.env.local`.

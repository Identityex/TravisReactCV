# Contact Form Setup Guide

This guide will help you set up the anonymous contact form for your portfolio.

## Prerequisites

- Vercel account for deployment
- Email account (Gmail recommended for simplicity)

## Setup Steps

### 1. Email Configuration

Choose one of the following options:

#### Option A: Gmail (Recommended)

1. Enable 2-factor authentication on your Google account
2. Generate an app password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Copy the generated password
3. Set up environment variables in Vercel:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-generated-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```

#### Option B: Custom SMTP

Set up these environment variables in Vercel:
```
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
SMTP_FROM=noreply@example.com
CONTACT_EMAIL=your-email@example.com
```

### 2. Vercel Configuration

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the environment variables from step 1
4. Redeploy your project

### 3. Testing

1. Visit your deployed site
2. Navigate to the Contact section
3. Fill out the form and submit
4. Check your email for the submission

## Security Notes

- Your email address is never exposed in the client-side code
- The form includes honeypot protection against bots
- All submissions are validated server-side
- Environment variables are securely stored in Vercel

## Customization

### Changing Email Templates

Edit `/api/contact.ts` to modify the email template HTML.

### Adding Fields

1. Add fields to the form in `/src/components/contact/contact-form.tsx`
2. Update the API handler in `/api/contact.ts`
3. Add the field to `CONTACT_MESSAGE_FIELDS`

### Rate Limiting

Consider adding rate limiting to prevent spam. You can use Vercel's Edge Config or a service like Upstash Redis.

## Troubleshooting

### Form not submitting

1. Check browser console for errors
2. Verify environment variables are set in Vercel
3. Check Vercel function logs

### Not receiving emails

1. Check spam folder
2. Verify email credentials are correct
3. Check Vercel function logs for errors
4. Try the test endpoint: `curl -X POST https://your-site.vercel.app/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","message":"Test message"}'`
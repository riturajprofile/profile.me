# Ritu Raj — Data Science Portfolio

A fast, modern single-page portfolio for Ritu Raj (BS in Data Science, IIT Madras). Built with HTML5, CSS3, and vanilla JavaScript — mobile-first, accessible, and lightweight.

## Features
- Clean, minimal design with white/blue/black palette
- Sticky navigation with smooth scrolling
- Subtle scroll animations via Intersection Observer
- Responsive layout using CSS Grid/Flexbox
- GitHub projects integration (fetches latest public repos)
- Contact form with validation and mailto fallback
- Downloadable resume button
- Social links and back-to-top button
- Lightweight skeleton loading states

## Quick start
You can open `index.html` directly in a browser, but for GitHub API fetches and best behavior, serve it over HTTP.

```zsh
# Serve the folder on http://localhost:8000
python3 -m http.server 8000 --directory .
```

Then open:

- http://localhost:8000/index.html

## Customize
- Email: Update the email in `assets/js/main.js` (search for `your.email@example.com`).
- LinkedIn: Replace the `#` link in the Contact section of `index.html` with your profile.
- Resume: Replace `assets/resume/Ritu_Raj_Resume.pdf` with your actual PDF.
- Projects: The GitHub username is set to `riturajprofile` in `assets/js/main.js`.

## Deploy
- GitHub Pages: Push this folder and enable Pages on the repository (`main` branch, `/root`).
- Netlify/Vercel: Drag-and-drop the folder or connect your repo. No build step required.

### Vercel (serverless function)
This project includes a serverless function at `/api/send-email` that can send email using SendGrid or SMTP. To enable sending, add the following environment variables in your Vercel project settings:

- `SENDGRID_API_KEY` (optional) — If set, SendGrid will be used.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (optional) — If set, SMTP will be used.
- `FROM_EMAIL` (optional) — Sender email address. Defaults to `SMTP_USER` or `TO_EMAIL`.
- `TO_EMAIL` (optional) — Recipient address (your email). Defaults to `riturajprofile.me@gmail.com`.

If no provider is configured, the function responds with 202 and echoes the payload (useful for local/dev).

After configuring environment variables, deploy to Vercel. The contact form will POST to `/api/send-email` automatically.

### Formspree (no backend required)
If you prefer to use Formspree (no server code required), you can configure the contact form to POST directly to Formspree:

1. Sign in to https://formspree.io and create a new form. Formspree will give you an endpoint like:

	https://formspree.io/f/abcd1234

2. Open `index.html` and replace the placeholder in the contact form's `data-endpoint` attribute with your endpoint. Example:

	<form id="contact-form" data-endpoint="https://formspree.io/f/abcd1234">...

3. The client already uses `fetch` and will POST JSON to Formspree and show success/failure messages.

Formspree will forward submissions to your email and can also be configured to integrate with other services.

## LinkedIn integration (serverless)
This project includes a serverless endpoint at `/api/linkedin` to fetch your LinkedIn profile and recent posts. For security, the function reads a single environment variable:

- `LINKEDIN_ACCESS_TOKEN` — a valid LinkedIn API access token with the following scopes: `r_liteprofile`, `r_emailaddress`, and `r_ugc` or `w_member_social` depending on desired access.

How to create a token for testing (developer flow):
1. Create a LinkedIn app at https://www.linkedin.com/developers/apps
2. Configure the app and request the scopes you need.
3. Use the OAuth 2.0 authorization flow to generate an access token, or use the LinkedIn developer console for short-lived tokens.

Warning: do NOT commit tokens to source control. Add `LINKEDIN_ACCESS_TOKEN` to Vercel Environment Variables.

Example: test the endpoint after deploying with Vercel (or `vercel dev`):

```zsh
curl https://<your-deployment>.vercel.app/api/linkedin
```

The endpoint will return your basic profile, email (if available), and recent UGC posts (if authorized).

## Tech stack
- HTML5, CSS3, JavaScript
- Intersection Observer API for animations
- No frameworks, no heavy dependencies

## License
This portfolio is provided as-is for personal use. You can adapt it freely for your own site.
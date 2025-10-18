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

## Tech stack
- HTML5, CSS3, JavaScript
- Intersection Observer API for animations
- No frameworks, no heavy dependencies

## License
This portfolio is provided as-is for personal use. You can adapt it freely for your own site.
# My CS Portfolio

A fast, accessible, and minimalist portfolio to showcase projects, skills, and contact info. Built with vanilla HTML/CSS/JS for easy hosting anywhere (GitHub Pages, Netlify, Vercel, local).

## Quick start
1. Open `index.html` in your browser (double-click works).
2. Edit the placeholders: name, links, resume, projects.
3. Deploy to GitHub Pages or your preferred static host.

## Customize
- Replace `Your Name` in `index.html` header and footer.
- Update social links in the Contact section.
- Add your resume to `assets/resume.pdf` and update the link.
- Edit `projects.json` to add/update your projects:
  ```json
  [
    {
      "title": "Project Name",
      "description": "One-liner that explains value.",
      "tags": ["Tech1", "Tech2"],
      "demo": "https://live-demo-url",
      "source": "https://github.com/you/repo"
    }
  ]
  ```

## Theming
- Click the moon/sun icon to toggle dark/light mode.
- Preference is saved to `localStorage`.

## Accessibility
- Skip link, proper landmarks, focus styles, responsive menu, and reduced motion friendly.

## Deploy
### GitHub Pages
1. Create a new repo and push files.
2. In repo settings → Pages → Source: `main` branch, root (`/`).
3. Wait for the URL to be generated.

### Netlify/Vercel
- Drag-and-drop the folder or connect the repo. No build step required.

## Structure
```
index.html
styles.css
script.js
projects.json
assets/
```

Create `assets/` and add:
- `favicon.png` (32x32)
- `resume.pdf`

## License
MIT — use freely and customize.



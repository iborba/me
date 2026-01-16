# Israel Borba - Personal Portfolio

[![GitHub Pages](https://img.shields.io/badge/Live-iborba.github.io/me-22d3ee)](https://iborba.github.io/me/)

A modern, terminal-inspired portfolio site for showcasing my software engineering experience.

## 🚀 Live Site

**[iborba.github.io/me](https://iborba.github.io/me/)**

## 🛠️ Tech Stack

- **Jekyll** - Static site generator
- **SCSS** - Styling with custom dark theme
- **GitHub Pages** - Hosting

## 📁 Structure

```
├── index.md          # Homepage
├── experience.html   # Career timeline
├── portfolio.html    # Projects & case studies
├── _config.yml       # Jekyll configuration
├── _data/cv.json     # Structured CV data
├── _layouts/         # HTML templates
├── _includes/        # Reusable components
├── assets/css/       # Custom SCSS styles
├── Jobs/             # Source CV files
└── scripts/          # Utility scripts
```

## 🔄 Updating Content

### Option 1: Edit directly
Edit `index.md`, `experience.html`, or `portfolio.html` with your new content.

### Option 2: Use the sync script
```bash
npm run sync      # Update _data/cv.json from Jobs folder
npm run sync:dry  # Preview changes without writing
```

## 💻 Local Development

```bash
# Install dependencies
bundle install

# Run locally
bundle exec jekyll serve

# Visit http://localhost:4000/me/
```

## 📝 License

MIT

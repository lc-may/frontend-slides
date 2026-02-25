# Frontend Slides

A Claude Code skill for creating stunning, animation-rich HTML presentations — from scratch or by converting PowerPoint files.

## What This Does

**Frontend Slides** helps non-designers create beautiful web presentations without knowing CSS or JavaScript. It uses a "show, don't tell" approach: instead of asking you to describe your aesthetic preferences in words, it generates visual previews and lets you pick what you like.

### Key Features

- **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools, no frameworks.
- **Visual Style Discovery** — Can't articulate design preferences? No problem. Pick from generated visual previews.
- **PPT Conversion** — Convert existing PowerPoint files to web, preserving all images and content.
- **Anti-AI-Slop** — 12 curated distinctive styles that avoid generic AI aesthetics.
- **Production Quality** — Accessible, responsive, well-commented code you can customize.
- **Viewport Fitting** — Every slide fits exactly in the viewport. No scrolling within slides.

## Installation

### For Claude Code Users

Clone or copy this skill to your Claude Code skills directory:

```bash
# Create the skill directory
mkdir -p ~/.claude/skills/frontend-slides

# Clone directly
git clone https://github.com/anthropics/frontend-slides.git ~/.claude/skills/frontend-slides

# Or copy files manually
cp -r ./frontend-slides/* ~/.claude/skills/frontend-slides/
```

The directory structure should be:

```
~/.claude/skills/frontend-slides/
├── SKILL.md                      # Main skill instructions
├── reference/
│   ├── style-presets.md          # 12 visual style definitions
│   ├── html-template.md          # HTML structure patterns
│   ├── viewport-fitting.md       # Viewport CSS requirements
│   └── animation-patterns.md     # Animation code patterns
└── scripts/
    ├── slide-controller.js       # JavaScript navigation controller
    └── pptx-extract.py           # PowerPoint extraction script
```

### Requirements

- **Claude Code CLI** — [Get it here](https://claude.ai/claude-code)
- **Python 3** with `python-pptx` — For PowerPoint conversion (optional)
  ```bash
  pip install python-pptx
  ```

## Usage

### Basic Usage

In Claude Code, type:

```
/frontend-slides
```

Then describe what you want:

```
> "I want to create a pitch deck for my AI startup"
```

### Create a New Presentation

```
/frontend-slides

> "Create a 10-slide presentation about OpenClaw, the open-source AI agent platform"
```

The skill will:
1. Ask about your content (slides, messages, images)
2. Ask about the feeling you want (impressed? excited? calm?)
3. Generate 3 visual style previews for you to compare
4. Create the full presentation in your chosen style
5. Open it in your browser

### Convert a PowerPoint

```
/frontend-slides

> "Convert my presentation.pptx to a web slideshow"
```

The skill will:
1. Extract all text, images, and notes from your PPT
2. Show you the extracted content for confirmation
3. Let you pick a visual style
4. Generate an HTML presentation with all your original assets

### Direct Style Selection

If you already know which style you want:

```
/frontend-slides

> "Create a 5-slide intro to my product using Paper & Ink style"
```

Available presets can be specified by name — skip the style discovery phase entirely.

## Available Styles

### Dark Themes

| Style | Vibe | Best For |
|-------|------|----------|
| **Bold Signal** | Confident, high-impact | Pitch decks, keynotes |
| **Electric Studio** | Clean, professional | Agency presentations |
| **Creative Voltage** | Energetic, retro-modern | Creative pitches |
| **Dark Botanical** | Elegant, sophisticated | Premium brands |
| **Neon Cyber** | Futuristic, techy | Tech startups |
| **Terminal Green** | Developer-focused | Dev tools, APIs |

### Light Themes

| Style | Vibe | Best For |
|-------|------|----------|
| **Notebook Tabs** | Editorial, organized | Reports, reviews |
| **Pastel Geometry** | Friendly, approachable | Product overviews |
| **Split Pastel** | Playful, modern | Creative agencies |
| **Vintage Editorial** | Witty, personality-driven | Personal brands |
| **Swiss Modern** | Minimal, precise | Corporate, data |
| **Paper & Ink** | Literary, thoughtful | Storytelling |
| **Deep Ocean Tech** | Professional, tech-forward | Corporate decks, investor pitches |

## Output Format

Each presentation is a **single, self-contained HTML file**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Fonts, CSS variables, all styles inline -->
    <style>
        :root {
            --bg-primary: #faf9f7;
            --accent-crimson: #c41e3a;
            /* ... */
        }
        .slide {
            height: 100vh;
            overflow: hidden;
        }
        /* ... -->
    </style>
</head>
<body>
    <section class="slide title-slide">
        <h1 class="reveal">Your Title</h1>
    </section>

    <section class="slide">
        <h2 class="reveal">Slide Content</h2>
    </section>

    <!-- Navigation: Arrow keys, scroll, swipe, or click dots -->
    <script>
        // SlidePresentation controller, animations, interactions
    </script>
</body>
</html>
```

### Built-in Features

- **Keyboard navigation** — Arrows (← →), Space, Page Up/Down, Home/End
- **Touch/swipe support** — Works on mobile and tablets
- **Mouse wheel scrolling** — Smooth navigation
- **Progress bar** — Visual indicator at the top
- **Navigation dots** — Click to jump to any slide
- **Scroll-triggered animations** — Elements animate as they enter view
- **Responsive design** — Adapts to all screen sizes
- **Reduced motion support** — Respects user preferences

### Output Options

You can request output in multiple formats:

```
> "Create slides about X, output both HTML and PPTX"
> "Convert this to HTML presentation"
> "Generate a PowerPoint from this outline"
```

## File Structure

```
frontend-slides/
├── SKILL.md                      # Main skill definition
├── README.md                     # This file
├── LICENSE                       # MIT License
│
├── reference/
│   ├── style-presets.md          # 12 curated visual styles
│   ├── html-template.md          # HTML structure patterns
│   ├── viewport-fitting.md       # Viewport CSS requirements
│   └── animation-patterns.md     # Animation code patterns
│
└── scripts/
    ├── slide-controller.js       # JavaScript navigation controller
    └── pptx-extract.py           # PowerPoint extraction script
```

## Philosophy

This skill was born from the belief that:

1. **You don't need to be a designer to make beautiful things.** You just need to react to what you see.

2. **Dependencies are debt.** A single HTML file will work in 10 years. A React project from 2019? Good luck.

3. **Generic is forgettable.** Every presentation should feel custom-crafted, not template-generated.

4. **Comments are kindness.** Code should explain itself to future-you (or anyone else who opens it).

5. **Viewport fitting is non-negotiable.** Every slide must fit exactly in the viewport — no scrolling within slides, ever.

## Customization

### Colors

Look for the `:root` CSS variables at the top of the HTML file:

```css
:root {
    --bg-primary: #faf9f7;
    --text-primary: #1a1a1a;
    --accent-crimson: #c41e3a;
}
```

### Fonts

Change the Google Fonts link in the `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont..." rel="stylesheet">
```

Then update the CSS variables:

```css
:root {
    --font-display: 'Your Display Font', serif;
    --font-body: 'Your Body Font', sans-serif;
}
```

### Animations

Modify the `.reveal` class timings:

```css
.reveal {
    transition: opacity 0.8s ease, transform 0.8s ease;
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Fonts not loading | Check Google Fonts URL, ensure font names match in CSS |
| Animations not triggering | Verify Intersection Observer is running, check `.visible` class |
| Scroll snap not working | Ensure `scroll-snap-type` on html/body, each slide needs `scroll-snap-align: start` |
| Mobile issues | Disable heavy effects at 768px breakpoint, test touch events |
| Content overflowing | See `reference/viewport-fitting.md` for complete troubleshooting |

## Credits

Created by [@zarazhangrui](https://github.com/zarazhangrui) with Claude Code.

Inspired by the "Vibe Coding" philosophy — building beautiful things without being a traditional software engineer.

## License

MIT — Use it, modify it, share it.

---

## Font Licenses

All fonts used in this skill are **free for commercial use**. No attribution required.

### SIL Open Font License 1.1 (OFL)

**Source:** [Google Fonts](https://fonts.google.com), [JetBrains](https://www.jetbrains.com/lp/mono/)

| Font | Used In |
|------|---------|
| Archivo Black | Bold Signal |
| Space Grotesk | Bold Signal |
| Manrope | Electric Studio |
| Syne | Creative Voltage |
| Space Mono | Creative Voltage |
| Cormorant / Cormorant Garamond | Dark Botanical, Paper & Ink |
| IBM Plex Sans | Dark Botanical |
| Bodoni Moda | Notebook Tabs |
| DM Sans | Notebook Tabs |
| Plus Jakarta Sans | Pastel Geometry |
| Outfit | Split Pastel |
| Fraunces | Vintage Editorial |
| Work Sans | Vintage Editorial |
| Archivo | Swiss Modern |
| Nunito | Swiss Modern |
| Source Serif 4 | Paper & Ink |
| JetBrains Mono | Terminal Green |

**OFL permits:**
- ✅ Personal use
- ✅ Commercial use
- ✅ Embedding in software/apps
- ✅ Modification and redistribution

**OFL prohibits:**
- ❌ Selling font files alone

Reference: [scripts.sil.org/OFL](https://scripts.sil.org/OFL)

### Fontshare License

**Source:** [Fontshare](https://www.fontshare.com)

| Font | Used In |
|------|---------|
| Clash Display | Neon Cyber |
| Satoshi | Neon Cyber |

**Fontshare License permits:**
- ✅ Personal use
- ✅ Commercial use
- ✅ Any media (print, web, mobile, apps, ePub, broadcast, OEM)

Reference: [fontshare.com](https://www.fontshare.com)

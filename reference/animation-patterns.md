# Animation Patterns Reference

Guide for matching animations to intended feelings, with code examples.

---

## Style → Feeling Mapping

### Dramatic / Cinematic
- Slow fade-ins (1-1.5s)
- Large scale transitions (0.9 → 1)
- Dark backgrounds with spotlight effects
- Parallax scrolling
- Full-bleed images

### Techy / Futuristic
- Neon glow effects (box-shadow with accent color)
- Particle systems (canvas background)
- Grid patterns
- Monospace fonts for accents
- Glitch or scramble text effects
- Cyan, magenta, electric blue palette

### Playful / Friendly
- Bouncy easing (spring physics)
- Rounded corners (large radius)
- Pastel or bright colors
- Floating/bobbing animations
- Hand-drawn or illustrated elements

### Professional / Corporate
- Subtle, fast animations (200-300ms)
- Clean sans-serif fonts
- Navy, slate, or charcoal backgrounds
- Precise spacing and alignment
- Minimal decorative elements
- Data visualization focus

### Calm / Minimal
- Very slow, subtle motion
- High whitespace
- Muted color palette
- Serif typography
- Generous padding
- Content-focused, no distractions

### Editorial / Magazine
- Strong typography hierarchy
- Pull quotes and callouts
- Image-text interplay
- Grid-breaking layouts
- Serif headlines, sans-serif body
- Black and white with one accent

---

## Entrance Animations

### Fade + Slide Up (most common)

```css
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s var(--ease-out-expo),
                transform 0.6s var(--ease-out-expo);
}

.visible .reveal {
    opacity: 1;
    transform: translateY(0);
}
```

### Scale In

```css
.reveal-scale {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.6s, transform 0.6s var(--ease-out-expo);
}

.visible .reveal-scale {
    opacity: 1;
    transform: scale(1);
}
```

### Slide from Left

```css
.reveal-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.6s, transform 0.6s var(--ease-out-expo);
}

.visible .reveal-left {
    opacity: 1;
    transform: translateX(0);
}
```

### Slide from Right

```css
.reveal-right {
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.6s, transform 0.6s var(--ease-out-expo);
}

.visible .reveal-right {
    opacity: 1;
    transform: translateX(0);
}
```

### Blur In

```css
.reveal-blur {
    opacity: 0;
    filter: blur(10px);
    transition: opacity 0.8s, filter 0.8s var(--ease-out-expo);
}

.visible .reveal-blur {
    opacity: 1;
    filter: blur(0);
}
```

### Rotate In

```css
.reveal-rotate {
    opacity: 0;
    transform: rotate(-10deg) scale(0.9);
    transition: opacity 0.6s, transform 0.6s var(--ease-out-expo);
}

.visible .reveal-rotate {
    opacity: 1;
    transform: rotate(0) scale(1);
}
```

---

## Staggered Animations

For multiple elements entering sequentially:

```css
/* Each child animates with increasing delay */
.reveal:nth-child(1) { transition-delay: 0.1s; }
.reveal:nth-child(2) { transition-delay: 0.2s; }
.reveal:nth-child(3) { transition-delay: 0.3s; }
.reveal:nth-child(4) { transition-delay: 0.4s; }
.reveal:nth-child(5) { transition-delay: 0.5s; }
.reveal:nth-child(6) { transition-delay: 0.6s; }

/* Or use CSS custom properties for dynamic delays */
.stagger-item {
    --delay: calc(var(--index) * 0.1s);
    transition-delay: var(--delay);
}
```

---

## Background Effects

### Gradient Mesh

```css
.gradient-bg {
    background:
        radial-gradient(ellipse at 20% 80%, rgba(120, 0, 255, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(0, 255, 200, 0.2) 0%, transparent 50%),
        var(--bg-primary);
}
```

### Animated Gradient

```css
.animated-gradient {
    background: linear-gradient(
        -45deg,
        var(--accent-1),
        var(--accent-2),
        var(--accent-3),
        var(--accent-4)
    );
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
```

### Grid Pattern

```css
.grid-bg {
    background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
}
```

### Dot Pattern

```css
.dot-bg {
    background-image: radial-gradient(
        rgba(255,255,255,0.1) 1px,
        transparent 1px
    );
    background-size: 20px 20px;
}
```

### Noise Texture (Subtle)

```css
.noise-bg {
    position: relative;
}

.noise-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
}
```

---

## Glow Effects

### Neon Glow

```css
.neon-glow {
    box-shadow:
        0 0 5px var(--accent),
        0 0 10px var(--accent),
        0 0 20px var(--accent),
        0 0 40px var(--accent);
}

/* Text glow */
.text-glow {
    text-shadow:
        0 0 10px var(--accent),
        0 0 20px var(--accent);
}
```

### Soft Glow

```css
.soft-glow {
    box-shadow: 0 0 40px rgba(0, 255, 204, 0.2);
}
```

---

## Interactive Effects

### 3D Tilt on Hover

```javascript
class TiltEffect {
    constructor(element) {
        this.element = element;
        this.element.style.transformStyle = 'preserve-3d';
        this.element.style.perspective = '1000px';
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            this.element.style.transform = `
                rotateY(${x * 10}deg)
                rotateX(${-y * 10}deg)
            `;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'rotateY(0) rotateX(0)';
        });
    }
}

// Initialize
document.querySelectorAll('.tilt').forEach(el => new TiltEffect(el));
```

### Magnetic Button

```javascript
class MagneticButton {
    constructor(element) {
        this.element = element;
        this.boundingRect = this.element.getBoundingClientRect();
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = this.element.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;

            this.element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'translate(0, 0)';
        });
    }
}
```

### Counter Animation

```javascript
class CounterAnimation {
    constructor(element, duration = 2000) {
        this.element = element;
        this.target = parseInt(element.getAttribute('data-target'));
        this.duration = duration;
    }

    start() {
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            // Easing: ease-out-cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(this.target * eased);

            this.element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }
}
```

---

## Scroll-Triggered Animations

Using Intersection Observer:

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // For counter animations
            const counter = entry.target.querySelector('.counter');
            if (counter) {
                new CounterAnimation(counter).start();
            }
        }
    });
}, {
    threshold: 0.3 // Trigger when 30% visible
});

document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide);
});
```

---

## Custom Cursor

```javascript
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };

        this.bindEvents();
        this.animate();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Grow on hover
        document.querySelectorAll('a, button, .interactive').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
    }

    animate() {
        // Lerp for smooth following
        this.pos.x += (this.mouse.x - this.pos.x) * 0.15;
        this.pos.y += (this.mouse.y - this.pos.y) * 0.15;

        this.cursor.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;

        requestAnimationFrame(() => this.animate());
    }
}
```

```css
/* Custom cursor styles */
.custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease;
    transform: translate(-50%, -50%);
}

.custom-cursor.hover {
    width: 40px;
    height: 40px;
    background: rgba(0, 255, 204, 0.1);
}

/* Hide default cursor */
body {
    cursor: none;
}

@media (max-width: 768px) {
    .custom-cursor {
        display: none;
    }
    body {
        cursor: auto;
    }
}
```

---

## Particle System (Canvas)

```javascript
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Draw
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 204, ${p.opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}
```

---

## Easing Functions

Common easing curves:

```css
:root {
    /* Smooth deceleration */
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
    --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

    /* Smooth acceleration */
    --ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);
    --ease-in-cubic: cubic-bezier(0.32, 0, 0.67, 0);

    /* Smooth in and out */
    --ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
    --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);

    /* Bouncy/spring */
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-bounce: cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

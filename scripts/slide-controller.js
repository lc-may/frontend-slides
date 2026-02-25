/**
 * ===========================================
 * SLIDE PRESENTATION CONTROLLER
 * ===========================================
 *
 * Handles navigation, animations, and interactions for HTML presentations.
 * Include this script at the end of your presentation HTML.
 *
 * Features:
 * - Keyboard navigation (arrows, space)
 * - Touch/swipe support for mobile
 * - Mouse wheel navigation
 * - Progress bar updates
 * - Navigation dots
 * - Intersection Observer for scroll-triggered animations
 */

class SlidePresentation {
    constructor(options = {}) {
        this.slides = document.querySelectorAll('.slide');
        this.currentIndex = 0;
        this.isAnimating = false;
        this.animationDuration = options.animationDuration || 600;

        this.init();
    }

    init() {
        this.createProgressBar();
        this.createNavDots();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
        this.setupWheelNavigation();
        this.setupIntersectionObserver();

        // Mark first slide as visible
        if (this.slides[0]) {
            this.slides[0].classList.add('visible');
        }

        // Update URL hash on load
        this.updateHash();
    }

    /**
     * Progress Bar
     * Visual indicator of presentation progress
     */
    createProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;

        this.progressBar = progressBar;
        this.updateProgress();
    }

    updateProgress() {
        if (!this.progressBar) return;
        const progress = ((this.currentIndex + 1) / this.slides.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    /**
     * Navigation Dots
     * Clickable dots for quick slide navigation
     */
    createNavDots() {
        const navContainer = document.querySelector('.nav-dots');
        if (!navContainer) return;

        this.navDots = [];

        this.slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.className = `nav-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            navContainer.appendChild(dot);
            this.navDots.push(dot);
        });
    }

    updateNavDots() {
        if (!this.navDots) return;
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    /**
     * Keyboard Navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Ignore if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                case 'PageDown':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    this.prevSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.slides.length - 1);
                    break;
            }
        });
    }

    /**
     * Touch/Swipe Navigation
     */
    setupTouchNavigation() {
        let touchStartY = 0;
        let touchStartX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;

            const deltaY = touchStartY - touchEndY;
            const deltaX = touchStartX - touchEndX;

            // Detect swipe direction (vertical preferred for slides)
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                if (Math.abs(deltaY) > 50) { // Minimum swipe distance
                    if (deltaY > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            }
        }, { passive: true });
    }

    /**
     * Mouse Wheel Navigation
     */
    setupWheelNavigation() {
        let wheelTimeout;

        document.addEventListener('wheel', (e) => {
            // Debounce wheel events
            if (wheelTimeout) return;

            wheelTimeout = setTimeout(() => {
                wheelTimeout = null;
            }, 800); // Match animation duration + buffer

            if (e.deltaY > 0) {
                this.nextSlide();
            } else if (e.deltaY < 0) {
                this.prevSlide();
            }
        }, { passive: true });
    }

    /**
     * Intersection Observer
     * Triggers animations when slides enter viewport
     */
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% visible
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.currentIndex = Array.from(this.slides).indexOf(entry.target);
                    this.updateProgress();
                    this.updateNavDots();
                    this.updateHash();
                }
            });
        }, options);

        this.slides.forEach(slide => this.observer.observe(slide));
    }

    /**
     * Navigation Methods
     */
    nextSlide() {
        if (this.currentIndex < this.slides.length - 1) {
            this.goToSlide(this.currentIndex + 1);
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.goToSlide(this.currentIndex - 1);
        }
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        if (index < 0 || index >= this.slides.length) return;

        this.isAnimating = true;
        this.currentIndex = index;

        this.slides[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        setTimeout(() => {
            this.isAnimating = false;
        }, this.animationDuration);
    }

    updateHash() {
        const slideId = this.slides[this.currentIndex]?.id;
        if (slideId) {
            history.replaceState(null, null, `#${slideId}`);
        }
    }
}


/**
 * ===========================================
 * OPTIONAL ENHANCEMENTS
 * Uncomment and configure as needed
 * ===========================================
 */

/*
// CUSTOM CURSOR
// Creates a stylized cursor with trail effect
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        this.cursorInner = document.createElement('div');
        this.cursorInner.className = 'cursor-inner';
        this.cursor.appendChild(this.cursorInner);

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

        // Grow on hover over interactive elements
        document.querySelectorAll('a, button, .nav-dot').forEach(el => {
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
// new CustomCursor();


// 3D TILT EFFECT
// Adds depth to cards on hover
class TiltEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.elements.forEach(el => this.initElement(el));
    }

    initElement(element) {
        element.style.transformStyle = 'preserve-3d';

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            element.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${-y * 10}deg)
            `;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    }
}
// new TiltEffect('.card, .tilt');


// COUNTER ANIMATION
// Animates numbers counting up
class CounterAnimation {
    constructor(selector, duration = 2000) {
        this.elements = document.querySelectorAll(selector);
        this.duration = duration;
        this.elements.forEach(el => this.observe(el));
    }

    observe(element) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate(element);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    }

    animate(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const start = 0;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            // Easing function
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }
}
// new CounterAnimation('.counter');
*/


// Initialize presentation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.presentation = new SlidePresentation();
});

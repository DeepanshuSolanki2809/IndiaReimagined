/* ==========================================================
   India Reimagined
   app.js
   Version 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initNavigation();
    initScrollEffects();
    initActiveNavigation();
    initBackToTop();
    initCounters();

});

/* ===========================================
   Sticky Navigation
=========================================== */

function initNavigation() {

    const header = document.querySelector("header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            header.style.background = "rgba(4,8,22,.90)";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.30)";

        } else {

            header.style.background = "rgba(4,8,22,.55)";
            header.style.boxShadow = "none";

        }

    });

}

/* ===========================================
   Reveal Animation
=========================================== */

function initScrollEffects() {

    const elements = document.querySelectorAll(".card, .intro, h2");

    if (!elements.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all .8s ease";

        observer.observe(el);

    });

}

/* ===========================================
   Active Navigation
=========================================== */

function initActiveNavigation() {

    const links = document.querySelectorAll("nav a");

    links.forEach(link => {

        if (link.href === window.location.href) {

            link.style.color = "#ffffff";

        }

    });

}

/* ===========================================
   Back To Top Button
=========================================== */

function initBackToTop() {

    const button = document.createElement("button");

    button.innerHTML = "↑";

    button.id = "backToTop";

    document.body.appendChild(button);

    Object.assign(button.style, {
        position: "fixed",
        right: "25px",
        bottom: "25px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        background: "#ff9933",
        color: "#111",
        fontSize: "22px",
        cursor: "pointer",
        opacity: "0",
        pointerEvents: "none",
        transition: ".3s",
        zIndex: "999"
    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.style.opacity = "1";
            button.style.pointerEvents = "auto";

        } else {

            button.style.opacity = "0";
            button.style.pointerEvents = "none";

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* ===========================================
   Animated Counters
=========================================== */

function initCounters() {

    const counters = document.querySelectorAll("[data-count]");

    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.count);

            let value = 0;

            const speed = target / 80;

            const update = () => {

                value += speed;

                if (value < target) {

                    counter.textContent = Math.floor(value).toLocaleString();

                    requestAnimationFrame(update);

                } else {

                    counter.textContent = target.toLocaleString();

                }

            };

            update();

            observer.unobserve(counter);

        });

    });

    counters.forEach(counter => observer.observe(counter));

}

/* ===========================================
   Smooth Anchor Links
=========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/* ===========================================
   Console Banner
=========================================== */

console.log(`
==========================================
🇮🇳 India Reimagined
Version 1.0
Designed for GitHub Pages
==========================================
`);

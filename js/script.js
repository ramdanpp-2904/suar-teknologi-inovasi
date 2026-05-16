/* ============================================================
   Suar Teknologi Inovasi — main script
   ============================================================ */

'use strict';

/* ---------- Language Toggle ---------- */
let currentLang = 'id';

function toggleLang() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    document.getElementById('langLabel').textContent = currentLang === 'id' ? 'EN' : 'ID';
    document.documentElement.lang = currentLang;
    applyLang();
}

function applyLang() {
    // Swap text for all lang-text elements
    document.querySelectorAll('.lang-text').forEach(el => {
        const val = el.dataset[currentLang];
        if (val !== undefined) el.textContent = val;
    });

    // Swap placeholders
    document.querySelectorAll('.lang-placeholder').forEach(el => {
        const key = currentLang === 'id' ? 'placeholderId' : 'placeholderEn';
        if (el.dataset[key]) el.placeholder = el.dataset[key];
    });
}

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
    toggleWaFloat();
}, { passive: true });

function updateActiveNav() {
    const offset = window.scrollY + 100;
    ['home','services','portfolio','pricing','contact'].forEach(id => {
        const section = document.getElementById(id);
        const link    = document.querySelector(`.nav-link[href="#${id}"]`);
        if (!section || !link) return;
        const inView  = offset >= section.offsetTop &&
                        offset <  section.offsetTop + section.offsetHeight;
        link.classList.toggle('active', inView);
    });
}

/* ---------- Mobile menu ---------- */
let menuOpen = false;

function toggleMenu() {
    menuOpen = !menuOpen;
    document.getElementById('navLinks').classList.toggle('open', menuOpen);
    const bars = document.querySelectorAll('.hamburger span');
    if (menuOpen) {
        bars[0].style.cssText = 'transform:translateY(7px) rotate(45deg)';
        bars[1].style.cssText = 'opacity:0';
        bars[2].style.cssText = 'transform:translateY(-7px) rotate(-45deg)';
    } else {
        bars.forEach(b => b.style.cssText = '');
    }
}

document.addEventListener('click', e => {
    if (menuOpen && !e.target.closest('.navbar')) {
        menuOpen = false;
        document.getElementById('navLinks').classList.remove('open');
        document.querySelectorAll('.hamburger span').forEach(b => b.style.cssText = '');
    }
});

document.querySelectorAll('.nav-link').forEach(l =>
    l.addEventListener('click', () => {
        if (menuOpen) toggleMenu();
    })
);

/* ---------- Smooth scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.offsetTop - navbar.offsetHeight;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Portfolio filter ---------- */
function filterPortfolio(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.portfolio-card').forEach(card => {
        const show = category === 'all' || card.dataset.category === category;
        card.style.display = show ? '' : 'none';
        if (show) {
            card.style.animation = 'none';
            card.offsetHeight;    // reflow
            card.style.animation = 'fadeInCard .4s ease both';
        }
    });
}

/* Add a quick fade-in keyframe via JS so we don't pollute the CSS file */
const ks = document.createElement('style');
ks.textContent = '@keyframes fadeInCard{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(ks);

/* ---------- WhatsApp float visibility ---------- */
function toggleWaFloat() {
    const waFloat = document.getElementById('waFloat');
    if (!waFloat) return;
    waFloat.classList.toggle('visible', window.scrollY > 300);
}

/* ---------- Contact form → WhatsApp ---------- */
function submitForm(e) {
    e.preventDefault();

    const name    = document.getElementById('fName').value.trim();
    const contact = document.getElementById('fContact').value.trim();
    const service = document.getElementById('fService').value;
    const message = document.getElementById('fMessage').value.trim();

    if (!name || !contact || !message) {
        alert(currentLang === 'id'
            ? 'Mohon lengkapi semua field yang diperlukan.'
            : 'Please fill in all required fields.');
        return;
    }

    const serviceMap = {
        web:     { id: 'Aplikasi Web',    en: 'Web Application'     },
        office:  { id: 'Aplikasi Kantor', en: 'Office Application'  },
        mobile:  { id: 'Aplikasi Mobile', en: 'Mobile Application'  },
        consult: { id: 'Konsultasi IT',   en: 'IT Consulting'       },
    };
    const svcLabel = service && serviceMap[service]
        ? serviceMap[service][currentLang]
        : (currentLang === 'id' ? 'Tidak disebutkan' : 'Not specified');

    let text;
    if (currentLang === 'id') {
        text = `Halo Suar Teknologi Inovasi,%0A%0A`
             + `Nama: ${enc(name)}%0A`
             + `Kontak: ${enc(contact)}%0A`
             + `Layanan: ${enc(svcLabel)}%0A%0A`
             + `Deskripsi:%0A${enc(message)}`;
    } else {
        text = `Hello Suar Teknologi Inovasi,%0A%0A`
             + `Name: ${enc(name)}%0A`
             + `Contact: ${enc(contact)}%0A`
             + `Service: ${enc(svcLabel)}%0A%0A`
             + `Description:%0A${enc(message)}`;
    }

    window.open(`https://wa.me/6282213792865?text=${text}`, '_blank', 'noopener');
    e.target.reset();
}

function enc(str) {
    return encodeURIComponent(str);
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    toggleWaFloat();
});

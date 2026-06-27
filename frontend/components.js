// ===== NAVIGATION BUILDER =====
function buildNav(activePage) {
  const links = [
    { href: 'index.html',          label: 'Home' },
    { href: 'about.html',          label: 'About' },
    { href: 'how-it-works.html',   label: 'How It Works' },
    { href: 'features.html',       label: 'Features' },
    { href: 'developers.html',     label: 'Team' },
    { href: 'contact.html',        label: 'Contact' },
  ];
  const navHTML = `
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">
          <div class="nav-logo-icon">🛡</div>
          <span>LeackLence <span style="color:var(--cyan)">AI</span></span>
        </a>
        <ul class="nav-links" id="navLinks">
          ${links.map(l => `
            <li><a href="${l.href}" class="${l.href === activePage ? 'active' : ''}">${l.label}</a></li>
          `).join('')}
          <li><a href="login.html" class="nav-cta">Login</a></li>
        </ul>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
}

// ===== FOOTER BUILDER =====
function buildFooter() {
  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="nav-logo" style="margin-bottom:4px">
              <div class="nav-logo-icon">🛡</div>
              <span>leacklence <span style="color:var(--cyan)">AI</span></span>
            </div>
            <p>AI-Powered Secure Examination Paper Protection System — protecting academic integrity end-to-end.</p>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="features.html">Features</a></li>
              <li><a href="how-it-works.html">How It Works</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Project</h4>
            <ul>
              <li><a href="developers.html">Developers</a></li>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="login.html">Login</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:support@leacklence.com">support@leacklence.com</a></li>
              <li><a href="tel:+91XXXXXXXXXX">+91 80504 80504</a></li>
              <li><a>Ahmedabad, Gujarat, India</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Developed by <strong style="color:var(--text-hi)">LeackLence Warriors</strong> &nbsp;·&nbsp; © 2026 All Rights Reserved</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .269.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:support@leacklence.com" class="social-link" aria-label="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>s
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// ===== SCROLL ANIMATION =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);
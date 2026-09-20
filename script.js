/* =====================================================
   Portfolio interactivity
   - Mobile nav toggle
   - Active link highlight on scroll
   - Contact form (demo only — no backend wired up)
   - Footer year
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the mobile menu after a link is tapped
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Highlight nav link for section in view ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- Contact form (demo handler) ----------
     This does not send data anywhere yet. Hook it up to
     your own backend, or a service like Formspree /
     EmailJS / Netlify Forms, then replace this handler.
  */
  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  if (contactForm && formNote) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        formNote.textContent = 'Please fill in every field before sending.';
        formNote.style.color = '#e0a0a0';
        return;
      }

      // Demo-only confirmation. Replace with a real fetch()/API call.
      formNote.textContent = 'Thanks! This is a demo form — connect it to your email service to receive real messages.';
      formNote.style.color = '#b7dcc9';
      contactForm.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Render news / article cards ----------
     Reads window.NEWS_ARTICLES from news-data.js and builds
     preview cards into any element with class "news-grid".
     A "data-limit" attribute on the grid (e.g. data-limit="3")
     caps how many cards are shown — used for the homepage
     teaser. The full News page grid has no limit.
  */
  function renderNewsCards() {
    var grids = document.querySelectorAll('.news-grid');
    if (!grids.length) return;

    var articles = window.NEWS_ARTICLES || [];

    grids.forEach(function (grid) {
      if (!articles.length) {
        grid.innerHTML = '<p class="news-empty">No articles added yet — add some in news-data.js.</p>';
        return;
      }

      var limit = parseInt(grid.getAttribute('data-limit'), 10);
      var items = isNaN(limit) ? articles : articles.slice(0, limit);

      grid.innerHTML = items.map(function (article) {
        return (
          '<a class="news-card" href="' + article.url + '" target="_blank" rel="noopener">' +
            '<div class="news-card-image">' +
              '<img src="' + article.image + '" alt="" loading="lazy">' +
              (article.tag ? '<span class="news-card-tag">' + article.tag + '</span>' : '') +
            '</div>' +
            '<div class="news-card-body">' +
              (article.date ? '<p class="news-card-date">' + article.date + '</p>' : '') +
              '<h3 class="news-card-title">' + article.title + '</h3>' +
              (article.excerpt ? '<p class="news-card-excerpt">' + article.excerpt + '</p>' : '') +
              '<p class="news-card-source">' + article.source + ' &rarr;</p>' +
            '</div>' +
          '</a>'
        );
      }).join('');
    });
  }

  renderNewsCards();

});

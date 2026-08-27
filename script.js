(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky nav background ---------- */
  var nav = document.getElementById("siteNav");
  function onScrollNav() {
    if (window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  document.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Mobile hamburger menu ---------- */
  var burger = document.getElementById("navBurger");
  var navTabs = document.getElementById("navTabs");
  burger.addEventListener("click", function () {
    var isOpen = navTabs.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  navTabs.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navTabs.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Scroll-spy active nav tab ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-tab"));

  function setActiveTab() {
    var scrollPos = window.scrollY + 140;
    var currentId = sections.length ? sections[0].id : null;
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) currentId = section.id;
    });
    navLinks.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + currentId;
      link.classList.toggle("is-active", match);
    });
  }
  document.addEventListener("scroll", setActiveTab, { passive: true });
  setActiveTab();

  /* ---------- Terminal boot line in hero ---------- */
  var terminalEl = document.getElementById("terminalLine");
  var bootText = "initializing_collins.sys ... ready";
  if (terminalEl) {
    if (prefersReducedMotion) {
      terminalEl.textContent = bootText;
    } else {
      var i = 0;
      (function typeChar() {
        if (i <= bootText.length) {
          terminalEl.textContent = bootText.slice(0, i);
          i++;
          setTimeout(typeChar, 28);
        }
      })();
    }
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Project filtering ---------- */
  var filterRow = document.getElementById("filterRow");
  var projectCards = Array.prototype.slice.call(document.querySelectorAll(".project-card"));

  if (filterRow) {
    filterRow.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;

      filterRow.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");

      var filter = btn.getAttribute("data-filter");
      projectCards.forEach(function (card) {
        var tags = (card.getAttribute("data-tags") || "").split(" ");
        var show = filter === "all" || tags.indexOf(filter) !== -1;
        card.classList.toggle("is-hidden", !show);
      });
    });
  }

  /* ---------- Contact form (front-end only) ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        status.textContent = "Please fill in all fields correctly.";
        return;
      }
      // No backend is wired up yet — replace this with a real request
      // (e.g. fetch() to your API, or a form service) when ready.
      status.textContent = "Message ready — connect a backend or form service to send it.";
      form.reset();
    });
  }
})();

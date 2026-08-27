COLLINS — PORTFOLIO SITE
=========================

FILES
  index.html   All sections (Home, About, Skills, Projects, Experience, Contact)
  style.css    Design system + responsive layout
  script.js    Nav, scroll-spy, terminal intro, project filters, form handling

ADD YOUR OWN ASSETS
  images/bj.8.png     -> your profile photo (used in the hero portrait frame)
  videos/vid7.mp4      -> your background video (used behind the hero)
  assets/collins-cv.pdf -> your CV, linked from the "Download CV" button

  These weren't included in this delivery since no image or video files were
  attached — the site is already wired to use them. If either file is
  missing, it degrades gracefully: the portrait shows a "C" monogram, and
  the hero just uses the dark gradient background.

REPLACE PLACEHOLDERS BEFORE PUBLISHING
  - https://github.com/YOUR_USERNAME  (appears in nav-adjacent Code section, footer, and each project card)
  - collins@example.com
  - linkedin.com/in/YOUR_USERNAME
  - The contact form currently only validates client-side and shows a status
    message — it isn't wired to send email yet. Connect it to a form service
    (e.g. Formspree) or your own backend endpoint.

RUNNING LOCALLY
  Just open index.html in a browser, or serve the folder with any static
  file server (e.g. `python3 -m http.server`) for the video/asset paths to
  resolve correctly.

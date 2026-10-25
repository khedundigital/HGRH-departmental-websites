# Paediatrics prototype audit — 25 October 2026

Source: https://github.com/NightWing617/website_templates at `452da96` (parent `0da6dea`). Audited the 13 tracked HTML pages, shared CSS and JavaScript, web components, workflow and JSON. The public prototype URL could not be fetched by the research browser during this audit; local repository contents are the primary audit evidence.

## Inventory and behavior

Pages: `index.html`, `about.html`, `admissions.html`, `clinics.html`, `contact.html`, `faq.html`, `feedback.html`, `guidelines.html`, `news.html`, `research.html`, `services.html`, `team.html`, `ward-info.html`. Navigation is injected by `components/nav-header.js`; footer by `components/site-footer.js`. Home links to admissions and FAQ, but FAQ is singular `faq.html`. News category buttons, FAQ filters/accordions and a mobile menu use JavaScript. Contact, feedback and news contain forms. `script.js` intercepts *all* form submissions, waits 1.5 seconds, then reports “Form submitted successfully!” without sending data. This is unsafe for a patient-facing demonstration.

The source uses Tailwind CDN, Feather CDN, Google Fonts, custom elements and a large JavaScript utility file; basic navigation disappears without JavaScript. No local raster/vector image assets were found. The external dependencies, visual motifs and page concepts are reference only; no clinical copy is assumed accurate. `hgrh_intern_guide.json` is retained in Git history but excluded from the published site.

## Content and link risk

The prototype contains phone numbers, visiting hours, clinic schedules, referrals, ward information, clinical guideline links, news, staff/team claims and POPIA compliance claims that lack recorded departmental approval. The footer claims a 24/7 paediatric emergency number and an approved hospital identity; neither is appropriate to carry into this demonstration. `guidelines.html`, `news.html` and `research.html` contain `href="#"` placeholders. Relative links between the 13 root pages resolve as files, but placeholder links have no destination. The source's social, privacy and terms links in the injected footer also use `#`. There is no source translation coverage: an EN | ZU control exists, yet no HTML page has `data-translate` elements. Its four-key dictionary cannot translate a page and its “emergency” translation is unreliable.

## Responsive and accessibility findings

The original has viewport tags and responsive Tailwind classes, but critical header/footer markup is JS-only. The menu and language controls sit inside shadow DOM, while `script.js` queries the light DOM, so language behavior is inconsistent. Skip navigation is injected by JS. Empty links, icon-only controls, reliance on external fonts/scripts, and uncontrolled fake form feedback require correction. Mobile layout and assistive-technology behavior have not been formally tested on devices. The replacement uses static landmarks, visible focus, native `details`, no forms, and a CSS-only responsive navigation baseline.

## Preserved material

The full source commit ancestry and legacy files remain in `prototype-archive/` and the original homepage in Git history for provenance. Only `site/` is published to GitHub Pages. The source repository and its deployment are untouched.

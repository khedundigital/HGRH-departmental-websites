# HGRH Digital Patient Access — unofficial demonstration

A public-facing **prototype**, not an approved hospital website. It demonstrates a caregiver journey through Paediatrics while operational and clinical content awaits hospital verification. No patient data is collected, no booking or submission system exists, and there is no O&G content. The original source repository and its deployment remain unchanged.

## Public website and editing

`site/` is the complete deployable website. Open `site/index.html` locally, upload the directory contents to any conventional static host, or ZIP the directory. No npm, Node, framework, server or build step is required. Edit the HTML files directly; shared colours, typography and components are in `site/assets/css/tokens.css` and `main.css`; print rules are in `print.css`. Keep links project-relative so they work under the GitHub Pages subpath and in a ZIP. Navigation is repeated in each HTML file so it remains available without JavaScript. The eight intended routes are `/`, `/paediatrics/`, `/paediatrics/admissions.html`, `/paediatrics/services.html`, `/paediatrics/preparation.html`, `/paediatrics/education.html`, `/paediatrics/faqs.html` and `/paediatrics/contact.html` relative to the published URL. The contact page carries only source-backed hospital-wide facts; exact Paediatrics locations and clinics remain unverified. The education page links to original WHO pages without copying their publications.

Do not add unverified schedules, contacts, referral rules, clinical advice or translations. Follow `docs/governance/approval-workflow.md` and update `docs/governance/content-register.csv` when content is reviewed. English is the only displayed language; translation readiness is recorded in `site/data/translations/status.json`.

## Test

Run `python3 tests/check_site.py`. It checks routes, local links and fragments, landmarks, the warning, no forms or external CDN dependency, and publish isolation basics. Also inspect in a browser at mobile, tablet and desktop widths, keyboard focus, print preview and JavaScript disabled. The site should render and navigate directly from files.

## Deployment and rollback

GitHub Actions in `.github/workflows/static.yml` uploads **only** `site/` to GitHub Pages from `main`. GitHub repository Pages settings must be set to **GitHub Actions**. Target: `https://khedundigital.github.io/HGRH-departmental-websites/`. Watch the workflow run and fetch the live home, Paediatrics, Admissions and FAQs pages after pushing. To roll back, use GitHub's revert action or `git revert <implementation-commit>` on `main`, then push and verify a new Pages run. Do not force push. The original prototype files are under `prototype-archive/`, with the original homepage in Git history; the full two-commit source ancestry remains. The archive is outside the Pages artifact.

## Handover

Review the migration baseline, prototype audit, government guidance notes, content register and 25 October journal under `docs/`. The owner must obtain hospital authority and named reviewers before presenting any detail as official. A completed O&G questionnaire is required in a **new task** before `/obgyn/` is built. See `docs/clinical/obgyn/requirements-template.md`, `questionnaire-mapping.md` and `obgyn/content-schema.json`. Meeting materials and process notes are kept outside this public repository in the MMedSci Project workspace.

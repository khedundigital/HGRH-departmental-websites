# Migration baseline

- Source repository: https://github.com/NightWing617/website_templates
- Original source tip: `452da96` (`main`, 25 October 2026 import)
- Imported tip before implementation: `452da96`; target was empty with no branch or commits.
- Target repository: https://github.com/khedundigital/HGRH-departmental-websites
- Decision: clone source into the empty supplied directory, retain the two-commit ancestry, rename its remote to `source` and disable pushing to it; use target as `origin`. No force push or history replacement. Publish only `site/` via Actions, because working documentation and legacy pages must not be exposed as Pages routes.
- Source push remote: deliberately inert `no-push://prototype-preserved`.
- Target implementation commit: recorded in the journal after commit.

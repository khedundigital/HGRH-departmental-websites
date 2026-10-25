# Obstetrics and Gynaecology: implementation slot

This directory is a non-published requirements and schema area. There is deliberately no `site/obgyn/` route and no O&G patient content while the departmental questionnaire is incomplete. The completed questionnaire should be supplied in a **new Codex task** and remain in the controlled MMedSci permissions workspace until it has been screened for personal or sensitive information.

## Planned public routes after review

- `/obgyn/` - department overview and clear scope
- `/obgyn/access.html` - verified access/referral and location details
- `/obgyn/services.html` - approved service directory
- `/obgyn/preparation.html` - reviewed preparation information
- `/obgyn/faqs.html` - approved operational answers

The shared header, warning, CSS tokens, print styles and link conventions in `site/` will be reused. All pages will be static HTML and must work without JavaScript. A language switch is deferred until a complete, reviewed translation exists. Any overlap with neonatal/Paediatrics material requires both departments to agree on ownership and wording.

## Intake sequence

1. Map questionnaire answers to the [requirements map](../docs/clinical/obgyn/questionnaire-mapping.md).
2. Validate each claim against the [content schema](content-schema.json); flag missing sources, dates or reviewers.
3. Request clinical, operational, communications, accessibility and language review. Do not infer missing clinic details or maternity advice.
4. Draft locally, test all routes and the demonstration warning, then publish only approved material through `site/`.
5. Record version, source, reviewer and next review date in the governance register.

No second repository is needed.

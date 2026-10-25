# Earlier prototype content reconciliation - 25 October 2026

Reviewed the imported `prototype-archive/` HTML against the [official KZN Health HGRH page](https://www.kznhealth.gov.za/provincial-hospitals/harry-gwala-hospital/) and [hospital services list](https://www.kznhealth.gov.za/provincial-hospitals/harry-gwala-hospital/harry-gwala-services/). Official pages returned HTTP 200 on 25 October 2026. Source files are preserved for design provenance, not as verified care information.

| Earlier website example | Current source evidence | Decision for public demonstration |
| --- | --- | --- |
| Hospital on Selby Msimang Road, described as Edendale/Pietermaritzburg | Official page states Lot 89, Selby Msimang Road, Plessislaer, Pietermaritzburg | Publish the official physical address with source and check date. |
| Paediatric ward / emergency number `+27 33 395 4703` | Official page publishes main hospital telephone `+27 (0) 33 395 4911`; no source found for the prototype's 4703 label | Do not publish 4703. Label 4911 as the **main hospital telephone**, never a booking/emergency line. |
| Ward at “Main Building, Level 2 – Paediatrics Wing” and paediatric reception desk | No current official department-level route or room identified | Show only as an unverified previous-design example in the content review record; do not direct patients there. |
| General Paediatrics, Growth & Development, Asthma Education, Immunisation and Nutrition clinic cards/timetable | Official services list confirms only the broad “Paediatric” category; historical newsletter mentions Paediatric Outpatients Clinic but does not establish current schedules | Preserve clinic names as clearly labelled concepts for departmental review. Do not publish weekdays, times, doctors or referral rules. |
| Visiting hours weekdays 15:00–16:00 and 19:00–20:00; weekends 15:00–16:00 | Official hospital page lists weekdays 13:00–14:00 and 17:00–18:00; weekends/holidays 13:00–15:00 | Publish official **general hospital** times with an explicit Paediatrics-ward confirmation warning. |
| Free parking, bus stops, ambulance entrance and 24/7 admissions | Not corroborated by current official page | Omit. |
| Contact/feedback/news forms with simulated success | No submission endpoint; source JS displays false success | Keep forms in undeployed archive only; deployed site has no forms. |

The older clinic table contains placeholder doctor names such as “Dr Smith” and “Dr Williams.” They are not real verified roster information and are not displayed. The new contact route links to the official hospital page and provides a map **search** for the verified address, not a claim about a specific entrance. The Public Relations Officer number, `033 395 4020`, is published by KZN Health for questions, complaints and compliments and is labelled that way.

**Departmental decision needed:** ask a named Paediatrics reviewer to confirm the actual clinics, routes, rooms, numbers, visiting arrangements, update owner and approval status before any of those specifics become patient directions.

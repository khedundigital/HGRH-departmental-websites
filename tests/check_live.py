#!/usr/bin/env python3
"""Verify the deployed static route set and publication boundary."""
from concurrent.futures import ThreadPoolExecutor
from urllib.error import HTTPError
from urllib.request import Request, urlopen

BASE = "https://khedundigital.github.io/HGRH-departmental-websites/"
PAGES = [
    "index.html", "paediatrics/index.html", "paediatrics/admissions.html",
    "paediatrics/services.html", "paediatrics/preparation.html",
    "paediatrics/programmes.html", "paediatrics/education.html",
    "paediatrics/forms.html", "paediatrics/faqs.html", "paediatrics/contact.html",
]
ROUTES = PAGES + ["zu/" + route for route in PAGES]
PDFS = ["documents/care-dependency-preparation-checklist.pdf",
        "documents/preterm-caregiver-questions.pdf"]
PRIVATE = ["docs/governance/content-register.csv", "prototype-archive/contact.html",
           "obgyn/"]


def check(route):
    request = Request(BASE + route, headers={"User-Agent": "HGRH-demo-route-check/1"})
    try:
        with urlopen(request, timeout=30) as response:
            body = response.read()
            status = response.status
    except HTTPError as error:
        body = error.read()
        status = error.code
    expected = 404 if route in PRIVATE else 200
    if status != expected:
        return f"FAIL {route}: HTTP {status}; expected {expected}"
    if route in ROUTES:
        warning = ("ISIBONELO ESINGAKAGUNYAZWA" if route.startswith("zu/")
                   else "UNOFFICIAL DEMONSTRATION")
        if warning.encode() not in body:
            return f"FAIL {route}: warning missing"
    if route in PDFS and not body.startswith(b"%PDF"):
        return f"FAIL {route}: not a PDF"
    return f"PASS {route}: HTTP {status}"


if __name__ == "__main__":
    with ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(check, ROUTES + PDFS + PRIVATE))
    print("\n".join(results))
    if any(result.startswith("FAIL") for result in results):
        raise SystemExit(1)
    print(f"PASS: {len(ROUTES)} pages, {len(PDFS)} PDFs, {len(PRIVATE)} private paths")

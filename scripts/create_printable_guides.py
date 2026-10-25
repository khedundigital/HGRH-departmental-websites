#!/usr/bin/env python3
"""Rebuild two original, non-clinical A4 guides for the static site.

Uses the bundled ReportLab runtime during editing. Hosting needs only the PDFs.
"""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

OUT = Path(__file__).resolve().parents[1] / "site" / "documents"
OUT.mkdir(parents=True, exist_ok=True)
font_path = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
FONT = "Helvetica"
if font_path.exists():
    pdfmetrics.registerFont(TTFont("HGRHArial", str(font_path)))
    FONT = "HGRHArial"
INK = colors.HexColor("#182e32")
DEEP = colors.HexColor("#123e43")
TEAL = colors.HexColor("#176c6a")
MUTED = colors.HexColor("#486066")
PALE = colors.HexColor("#e1f0eb")
WARN = colors.HexColor("#fff2d9")
LINE = colors.HexColor("#cbd8d5")
S = {
    "title": ParagraphStyle("title", fontName=FONT, fontSize=20, leading=25, textColor=DEEP, spaceAfter=11),
    "lead": ParagraphStyle("lead", fontName=FONT, fontSize=10, leading=15, textColor=INK, spaceAfter=13),
    "heading": ParagraphStyle("heading", fontName=FONT, fontSize=12.2, leading=16, textColor=DEEP, spaceBefore=12, spaceAfter=7),
    "body": ParagraphStyle("body", fontName=FONT, fontSize=9.2, leading=13.4, textColor=INK, spaceAfter=8),
    "small": ParagraphStyle("small", fontName=FONT, fontSize=7.7, leading=11, textColor=MUTED, spaceAfter=7, wordWrap="CJK"),
}

def p(text, kind="body"):
    return Paragraph(text, S[kind])

def box(text, color=WARN):
    t = Table([[p(text, "body")]], colWidths=[174 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), color),
        ("BOX", (0, 0), (-1, -1), 0.7, TEAL),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    return t

def footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFillColor(TEAL)
    canvas.rect(0, h - 10 * mm, w, 10 * mm, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT, 7.5)
    canvas.drawString(18 * mm, 12 * mm, "UNOFFICIAL DEMONSTRATION  |  no information sent to this website")
    canvas.drawRightString(w - 18 * mm, 12 * mm, "October 2026")
    canvas.restoreState()

def build(name, story):
    path = OUT / name
    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=18*mm, rightMargin=18*mm,
                            topMargin=21*mm, bottomMargin=21*mm, title=name.replace("-", " "))
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(path)

care = [
    p("Preparing to ask about a Care Dependency Grant", "title"),
    p("A printable conversation checklist for a caregiver. Use it to prepare questions for SASSA or a social worker. It is not an official grant application or proof of eligibility.", "lead"),
    box("<b>Important:</b> South African Government says the Care Dependency Grant application form is obtained at a SASSA office and completed in the presence of a SASSA officer. Do not submit this checklist as an application."),
    p("Before you visit SASSA", "heading"),
    p("□ Check the current official grant page and the nearest SASSA office.<br/>□ Ask which identity, child, caregiver, income and medical documents apply to your situation.<br/>□ Ask whether a state medical assessment or referral form is required before applying.<br/>□ Keep copies or a list of documents you take; ask for a receipt after applying."),
    p("Documents to ask about", "heading"),
    p("□ Caregiver identity document and the child’s birth certificate or accepted alternatives.<br/>□ Medical or assessment report, if requested by SASSA.<br/>□ Proof of caregiver relationship or foster placement, if relevant.<br/>□ Current income or bank records, if requested for the means test."),
    p("Questions for the official service", "heading"),
    p("1. Which grant or other support is appropriate for this child? ______________________________________<br/><br/>2. What should we bring, and who completes each document? ______________________________________<br/><br/>3. Where and when can we apply? ______________________________________________________________<br/><br/>4. Who can explain a decision or help with an appeal? ___________________________________________"),
    p("Official sources", "heading"),
    p("Care Dependency Grant information: https://www.gov.za/services/services-residents/parenting/child-care/care-dependency-grant", "small"),
    p("SASSA grants information and downloadable supporting forms: https://services.sassa.gov.za/portal/r/sassa/sassa/grants-information", "small"),
    p("Information checked 25 October 2026. Confirm the current process directly with SASSA. Do not write identity numbers or health details on a copy you leave at a public printer.", "small"),
]
build("care-dependency-preparation-checklist.pdf", care)

preterm = [
    p("Questions for a premature baby's care team", "title"),
    p("A printable prompt sheet for a parent or caregiver. It offers questions, not medical instructions. Your child's team should give advice specific to your baby.", "lead"),
    box("<b>Programme idea:</b> a parent support circle for families of premature babies is only a proposal on this demonstration site. No hospital group or enrolment route has been confirmed." , PALE),
    p("Before leaving or at the next visit", "heading"),
    p("□ Who should we contact if we have a question about our baby?<br/>□ How will we know the next appointment date and location?<br/>□ What feeding plan and medicines, if any, has the care team prescribed for our baby?<br/>□ What changes should make us seek urgent professional help?<br/>□ What records or supplies should we bring to follow-up?"),
    p("Support and practical needs", "heading"),
    p("□ Is there an existing hospital or community parent support group?<br/>□ Can a social worker discuss transport, documents or grant questions with us?<br/>□ Is there a written discharge plan in the language we understand?<br/>□ Who can help us practise the care tasks shown by staff before we go home?"),
    p("Our questions for the care team", "heading"),
    p("1. _______________________________________________________________________________________<br/><br/>2. _______________________________________________________________________________________<br/><br/>3. _______________________________________________________________________________________<br/><br/>4. _______________________________________________________________________________________"),
    p("Where to find further reading", "heading"),
    p("The website’s Education page links to original WHO caregiver materials and clearly labels health-worker references. Ask your care team which resources suit your baby: https://khedundigital.github.io/HGRH-departmental-websites/paediatrics/education.html", "small"),
    p("This paper is for your own use. Nothing is submitted to the website. For an urgent concern, seek local emergency care.", "small"),
]
build("preterm-caregiver-questions.pdf", preterm)

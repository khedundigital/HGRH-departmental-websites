#!/usr/bin/env python3
"""Refresh the static bilingual navigation and footer on every public HTML page.

This is an optional editing helper. The generated pages remain standalone HTML.
"""
from pathlib import Path
from posixpath import relpath
import re

SITE=Path(__file__).resolve().parents[1]/'site'
KEYS=['home','paeds','admissions','services','preparation','programmes','education','forms','faqs','contact']
PATHS={'home':'index.html','paeds':'paediatrics/index.html','admissions':'paediatrics/admissions.html','services':'paediatrics/services.html','preparation':'paediatrics/preparation.html','programmes':'paediatrics/programmes.html','education':'paediatrics/education.html','forms':'paediatrics/forms.html','faqs':'paediatrics/faqs.html','contact':'paediatrics/contact.html'}
LABELS={
 'en':['Home','Paediatrics','Admissions','Clinics','Visit prep','Programmes','Education','Forms & help','FAQs','Contact'],
 'zu':['Ekhaya','Izingane','Ukwamukelwa','Imitholampilo','Ukuvakashela','Izinhlelo','Imfundo','Amafomu nosizo','Imibuzo','Xhumana'],
}

def path_for(key,lang): return ('zu/' if lang=='zu' else '')+PATHS[key]
def href(current,key,lang):
 start=current.parent.relative_to(SITE).as_posix()
 return relpath(path_for(key,lang),start if start!='.' else '.')
def key_of(path):
 rel=path.relative_to(SITE).as_posix()
 lang='zu' if rel.startswith('zu/') else 'en'
 core=rel[3:] if lang=='zu' else rel
 return lang,next(k for k,v in PATHS.items() if v==core)
def menu(path,lang,key):
 items=[]
 for k,label in zip(KEYS,LABELS[lang]):
  current=' aria-current="page"' if k==key else ''
  items.append(f'<li><a href="{href(path,k,lang)}"{current}>{label}</a></li>')
 return '\n'.join(items)
def chrome(path,lang,key):
 en=lang=='en'; other='zu' if en else 'en'
 status=('UNOFFICIAL DEMONSTRATION','This website is a prototype and is not an approved hospital information service. Clinical and operational details require hospital verification.') if en else ('ISIBONELO ESINGAKAGUNYAZWA','Le webhusayithi iyisibonelo futhi ayigunyaziwe njengesevisi yolwazi yesibhedlela. Ulwazi lwezokwelapha nolokusebenza ludinga ukuqinisekiswa yisibhedlela.')
 brand_sub='Independent design demonstration' if en else 'Isibonelo esizimele sewebhusayithi'
 brand_aria='HGRH patient access demonstration, home' if en else 'Isibonelo se-HGRH, ikhasi lasekhaya'
 nav_name='Main navigation' if en else 'Ukuzulazula okuyinhloko'
 menu_label='Explore this site' if en else 'Buka le webhusayithi'
 subtitle='A patient access prototype' if en else 'Isibonelo solwazi lweziguli'
 official='Official hospital information' if en else 'Ulwazi olusemthethweni lwesibhedlela'
 official_cta='Visit the KZN Health hospital page ↗' if en else 'Vula ikhasi le-KZN Health ↗'
 review='' if en else '<div class="translation-banner"><div class="container"><strong>Isihumusho sesiZulu esisalinde ukubuyekezwa.</strong> Lo mbhalo uyisibonelo esenziwe ngosizo lwe-AI; kudingeka ukubuyekezwa ngumhumushi oqeqeshiwe nabasebenzi bezempilo. <a href="'+href(path,key,'en')+'" lang="en">Read the English page</a>.</div></div>'
 header=f'''<a class="skip-link" href="#main-content">{'Skip to main content' if en else 'Yeqela kokuqukethwe'}</a>
<div class="demo-banner" role="note"><div class="container"><strong>{status[0]}</strong><span>— {status[1]}</span></div></div>
<header class="site-header"><div class="container header-top"><a class="brand" href="{href(path,'home',lang)}" aria-label="{brand_aria}"><span class="brand-mark" aria-hidden="true">✳</span><span><span class="brand-name">HGRH Patient Access</span><span class="brand-sub">{brand_sub}</span></span></a><div class="header-tools"><span class="header-caption">{subtitle}</span><nav class="language-switch" aria-label="{'Language' if en else 'Ulimi'}"><a href="{href(path,key,'en')}" hreflang="en" lang="en"{' aria-current="page"' if en else ''}>English</a><a href="{href(path,key,'zu')}" hreflang="zu" lang="zu"{' aria-current="page"' if not en else ''}>isiZulu <small>{'draft' if en else 'isibonelo'}</small></a></nav></div></div>
<div class="nav-shell"><div class="container"><nav class="site-nav" aria-label="{nav_name}"><ul>{menu(path,lang,key)}</ul></nav><details class="mobile-nav"><summary>{menu_label}<span aria-hidden="true">⌄</span></summary><nav aria-label="{nav_name}"><ul>{menu(path,lang,key)}</ul></nav></details></div></div></header>
<div class="utility-strip"><div class="container"><p>{official}</p><p><a href="https://www.kznhealth.gov.za/provincial-hospitals/harry-gwala-hospital/">{official_cta}</a></p></div></div>{review}
'''
 return header

def footer(path,lang):
 en=lang=='en'
 about='About this demonstration' if en else 'Mayelana nalesi sibonelo'
 about_p='Independent prototype for a possible patient information service. No hospital approval, patient-data collection, online booking or enrolment.' if en else 'Lena iwebhusayithi yesibonelo ezimele. Ayikagunyazwa yisibhedlela. Ayigcini ulwazi lweziguli futhi ayibhukhi noma ibhalise abantu.'
 explore='Explore' if en else 'Buka amakhasi'
 before='Before you rely on this' if en else 'Ngaphambi kokuthembela kulolu lwazi'
 before_p='Confirm clinics, admission routes, hours and contact details through official hospital channels. Historical prototype examples are labelled. For urgent concerns, seek local emergency care.' if en else 'Qinisekisa imitholampilo, izikhathi, izindlela zokwamukelwa nezinombolo ngabasebenzi besibhedlela. Imininingwane yesibonelo sangaphambilini imakiwe. Uma kuphuthuma, funa usizo oluphuthumayo endaweni yakini.'
 links=''.join(f'<li><a href="{href(path,k,lang)}">{label}</a></li>' for k,label in zip(KEYS,LABELS[lang]))
 bottom='© 2026 Khedun Digital · Unofficial demonstration · No forms or tracking' if en else '© 2026 Khedun Digital · Isibonelo esingakagunyazwa · Akukho amafomu athumela imininingwane'
 return f'''<footer class="site-footer"><div class="container"><div class="footer-grid"><div><h2>{about}</h2><p>{about_p}</p><p><a href="https://www.kznhealth.gov.za/provincial-hospitals/harry-gwala-hospital/">{'Official KZN Health hospital page ↗' if en else 'Ikhasi elisemthethweni le-KZN Health ↗'}</a></p></div><div><h2>{explore}</h2><ul>{links}</ul></div><div><h2>{before}</h2><p>{before_p}</p></div></div><div class="footer-bottom">{bottom}</div></div></footer>'''

for path in SITE.rglob('*.html'):
 try: lang,key=key_of(path)
 except StopIteration: continue
 s=path.read_text()
 s,n=re.subn(r'<body(?:[^>]*)>.*?<main id="main-content">',f'<body class="lang-{lang}">\n{chrome(path,lang,key)}<main id="main-content">',s,flags=re.S)
 assert n==1,(path,'body',n)
 s,n=re.subn(r'<footer class="site-footer">.*?</footer>',footer(path,lang),s,flags=re.S)
 assert n==1,(path,'footer',n)
 s=re.sub(r'\s*<link rel="alternate"[^>]*>', '', s)
 s=s.replace('</head>',f'    <link rel="alternate" hreflang="{("zu" if lang=="en" else "en")}" href="{href(path,key,("zu" if lang=="en" else "en"))}" />\n  </head>')
 s=re.sub(r'main\.css\?v=[^\"]+', 'main.css?v=20261025c',s)
 path.write_text(s)
 print(path.relative_to(SITE))

#!/usr/bin/env python3
"""Check the exact directory uploaded to Pages; standard library only."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import sys

SITE = Path(__file__).resolve().parents[1] / 'site'
ROUTES = [
    'index.html', 'paediatrics/index.html', 'paediatrics/admissions.html',
    'paediatrics/services.html', 'paediatrics/preparation.html',
    'paediatrics/education.html', 'paediatrics/faqs.html',
    'paediatrics/contact.html',
]
WARNING = 'UNOFFICIAL DEMONSTRATION'

class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]; self.ids=set(); self.forms=0; self.html_lang=None; self.main=0; self.h1=0; self.nav=0; self.images=[]; self.warning=False; self.text=[]
    def handle_starttag(self, tag, attrs):
        d=dict(attrs)
        if tag=='html': self.html_lang=d.get('lang')
        if tag=='main': self.main+=1
        if tag=='h1': self.h1+=1
        if tag=='nav': self.nav+=1
        if tag=='form': self.forms+=1
        if 'id' in d: self.ids.add(d['id'])
        if tag in ('a','link','img','script'):
            key='href' if tag in ('a','link') else 'src'
            if d.get(key): self.links.append(d[key])
        if tag=='img': self.images.append(d)
    def handle_data(self,data): self.text.append(data)

errors=[]
for route in ROUTES:
    path=SITE/route
    if not path.is_file(): errors.append(f'missing route: {route}'); continue
    html=path.read_text()
    p=Links(); p.feed(html)
    visible=' '.join(' '.join(p.text).split())
    if WARNING not in visible or 'Clinical and operational details require hospital verification.' not in visible: errors.append(f'{route}: warning missing')
    if p.html_lang!='en' or p.main!=1 or p.h1!=1 or p.nav<1: errors.append(f'{route}: landmarks or language invalid')
    if p.forms: errors.append(f'{route}: form found')
    if any('alt' not in img for img in p.images): errors.append(f'{route}: image missing alt')
    if 'cdn.' in html or 'fonts.googleapis' in html: errors.append(f'{route}: CDN dependency')
    for link in p.links:
        u=urlsplit(link)
        if u.scheme or u.netloc or link.startswith(('mailto:','tel:','data:')): continue
        if u.path:
            target=(path.parent/unquote(u.path)).resolve()
            if not target.is_relative_to(SITE.resolve()) or not target.is_file(): errors.append(f'{route}: broken or escaping link {link}')
        else: target=path
        if u.fragment and target.suffix=='.html':
            q=Links(); q.feed(target.read_text())
            if u.fragment not in q.ids: errors.append(f'{route}: missing fragment {link}')
    print('checked', route)

status=json.loads((SITE/'data/translations/status.json').read_text())
if status['languages']['zu']['interface']!='not published': errors.append('isiZulu status mismatch')
if (SITE/'obgyn').exists(): errors.append('O&G public route exists')
if '+27 (0) 33 395 4911' not in (SITE/'paediatrics/contact.html').read_text():
    errors.append('official hospital telephone missing')
if 'Lot 89, Selby Msimang Road' not in (SITE/'paediatrics/contact.html').read_text():
    errors.append('official hospital address missing')
if '9789240112698' not in (SITE/'paediatrics/education.html').read_text():
    errors.append('WHO newborn resource missing')
for path in SITE.rglob('*.html'):
    if '395 4703' in path.read_text() or '3954703' in path.read_text():
        errors.append(f'unverified prototype phone number in {path.relative_to(SITE)}')
for path in SITE.rglob('*'):
    if path.is_file() and path.suffix in ('.md','.env'):
        errors.append(f'non-public file inside site: {path.relative_to(SITE)}')
if errors:
    print('\n'.join('FAIL '+e for e in errors),file=sys.stderr); sys.exit(1)
print(f'PASS: {len(ROUTES)} routes, local links, warnings, source-backed contacts, static safety and language status')

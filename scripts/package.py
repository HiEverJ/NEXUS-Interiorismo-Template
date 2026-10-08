from pathlib import Path
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'release' / 'NEXUS-1.1.0.zip'
PLACEHOLDER = '''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#25292c"/><rect x="80" y="80" width="1040" height="740" fill="none" stroke="#a68c68"/><text x="600" y="425" fill="#e5e5e0" font-family="Georgia,serif" font-size="58" text-anchor="middle">NEXUS</text><text x="600" y="490" fill="#bec0c2" font-family="Arial,sans-serif" font-size="24" text-anchor="middle">Replace with your project image</text></svg>'''

def build():
    html = (ROOT / 'index.html').read_text(encoding='utf-8-sig')
    def image(match):
        tag = match.group(0)
        tag = re.sub(r'src="[^"]+"', 'src="assets/img/placeholder.svg"', tag, count=1)
        tag = re.sub(r'\s+(?:srcset|sizes)="[^"]+"', '', tag)
        tag = re.sub(r'alt="[^"]+"', 'alt="Project image placeholder — replace with your own photograph"', tag)
        return tag
    html = re.sub(r'<img\b[^>]*>', image, html)
    readme = (ROOT / 'README.txt').read_text(encoding='utf-8-sig')
    readme = '\n'.join(line for line in readme.splitlines() if not line.startswith(('release/', 'scripts/')))
    OUTPUT.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(OUTPUT, 'w', zipfile.ZIP_DEFLATED) as archive:
        archive.writestr('NEXUS/index.html', html)
        archive.writestr('NEXUS/README.txt', readme)
        archive.writestr('NEXUS/assets/img/placeholder.svg', PLACEHOLDER)
        for folder in ('assets/js', 'scss', 'documentation'):
            for path in sorted((ROOT / folder).rglob('*')):
                if path.is_file() and path.suffix in ('.js', '.css', '.scss', '.html'):
                    data = path.read_text(encoding='utf-8-sig')
                    data = re.sub(r'/\*# sourceMappingURL=.*?\*/', '', data)
                    archive.writestr('NEXUS/' + path.relative_to(ROOT).as_posix(), data)
    with zipfile.ZipFile(OUTPUT) as archive:
        assert archive.testzip() is None
        delivered = archive.read('NEXUS/index.html').decode()
        assert 'images.unsplash.com' not in delivered
        assert 'srcset=' not in delivered
        assert 'NEXUS/assets/img/placeholder.svg' in archive.namelist()
        assert all('/.git/' not in name and not name.endswith('.pdf') for name in archive.namelist())
    print(f'Created and verified: {OUTPUT.name} ({OUTPUT.stat().st_size:,} bytes)')

if __name__ == '__main__':
    build()

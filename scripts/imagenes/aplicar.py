# Descarga la imagen elegida (1280 px), la recorta a 16:9, la comprime y la agrega al encabezado de la nota.
# Uso: python3 -I aplicar.py <carpeta tanda> <repo> slug=indice[:altura 0-1][:autor] ...
import json, sys, os, re, time, io, urllib.parse, urllib.request, urllib.error
from PIL import Image
UA = "PanoramaUniversalWeb/1.0 (panoramauniversal2024@gmail.com)"
def get(url):
    for i in range(80):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60).read()
        except urllib.error.HTTPError as e:
            if e.code not in (429, 500, 502, 503, 504): raise
            time.sleep(max(int(e.headers.get("Retry-After") or 0), 20))
    raise SystemExit("429")
carpeta, repo = sys.argv[1], sys.argv[2]
cand = json.load(open(f"{carpeta}/cand.json"))
def limpiar_autor(a):
    a = re.sub(r"\s+", " ", a).strip()
    if not a or re.match(r"(?i)unknown", a): return "autor desconocido"
    a = re.sub(r"^(Foto|Photo|Photograph)( by)?:?\s*", "", a, flags=re.I)
    return a[:70].rstrip(" ,;-")
for arg in sys.argv[3:]:
    slug, resto = arg.split("=", 1)
    partes = resto.split(":", 2)
    c = cand[slug][int(partes[0])]
    vy = float(partes[1]) if len(partes) > 1 and partes[1] else 0.5
    autor = partes[2] if len(partes) > 2 else limpiar_autor(c["autor"])
    url = c.get("full") or re.sub(r"/\d+px-", "/1280px-", c["thumb"])
    try: data = get(url)
    except urllib.error.HTTPError: data = get(c["thumb"].replace("/330px-", "/960px-"))
    im = Image.open(io.BytesIO(data)).convert("RGB"); w, h = im.size; th = round(w * 9 / 16)
    if th <= h: top = round((h - th) * vy); im = im.crop((0, top, w, top + th))
    else: tw = round(h * 16 / 9); l = (w - tw) // 2; im = im.crop((l, 0, l + tw, h))
    im = im.resize((1200, 675), Image.LANCZOS)
    out = f"{repo}/public/notas/{slug}.webp"
    for q in (72, 64, 56, 48, 40):
        im.save(out, "WEBP", quality=q, method=6)
        if os.path.getsize(out) < 130_000: break
    lic = "dominio público" if re.match(r"(?i)public|pd", c["licencia"]) else c["licencia"]
    credito = f"Foto: {autor} / {c.get('fuente', 'Wikimedia Commons')} ({lic})"
    p = f"{repo}/content/notas/{slug}.md"; t = open(p).read()
    t = re.sub(r"^(imagen|credito|creditoUrl): .*\n", "", t, flags=re.M)
    t = re.sub(r"^(resumen: .*)$", lambda m: m.group(1) + f"\nimagen: /notas/{slug}.webp\ncredito: {credito}\ncreditoUrl: {c['pagina']}", t, count=1, flags=re.M)
    open(p, "w").write(t)
    print(f"{slug[:45]:45} {os.path.getsize(out)//1024:4} KB | {credito}", flush=True)
    time.sleep(3)

# Para cada nota busca en Commons hasta 4 fotos horizontales y arma una hoja de contactos.
# Uso: python3 -I candidatas.py tanda.txt salida   (tanda.txt: "slug | consulta 1 ; consulta 2")
import json, sys, os, re, time, urllib.parse, urllib.request, urllib.error
from PIL import Image, ImageDraw
UA = "PanoramaUniversalWeb/1.0 (panoramauniversal2024@gmail.com)"
def get(url):
    for i in range(80):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60).read()
        except urllib.error.HTTPError as e:
            if e.code not in (429, 500, 502, 503, 504): raise
            time.sleep(max(int(e.headers.get("Retry-After") or 0), 20))
    raise SystemExit("429")
def api(p): return json.loads(get("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({**p, "format": "json"})))
tanda, salida = sys.argv[1], sys.argv[2]
os.makedirs(salida, exist_ok=True)
res = json.load(open(f"{salida}/cand.json")) if os.path.exists(f"{salida}/cand.json") else {}
for linea in open(tanda):
    if "|" not in linea: continue
    slug, consultas = (x.strip() for x in linea.split("|", 1))
    if slug in res: continue
    vistos, lista = set(), []
    for q in consultas.split(";"):
        r = api({"action": "query", "generator": "search", "gsrsearch": f"{q.strip()} filetype:bitmap", "gsrnamespace": 6,
                 "gsrlimit": 15, "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": 330})
        for p in sorted(r.get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 0)):
            ii = p["imageinfo"][0]; m = ii.get("extmetadata", {})
            if p["title"] in vistos or ii["width"] < 1280 or ii["width"] < ii["height"] * 1.2: continue
            lic = m.get("LicenseShortName", {}).get("value", "")
            if not re.search(r"CC0|CC BY|Public domain|PD", lic, re.I) or "NC" in lic or "ND" in lic: continue
            vistos.add(p["title"])
            lista.append({"archivo": p["title"][5:], "pagina": ii["descriptionurl"], "licencia": lic, "thumb": ii["thumburl"],
                          "autor": re.sub(r"<[^>]+>", "", m.get("Artist", {}).get("value", "")).strip()})
            if len([c for c in lista if c.get("q") == q]) >= 4: break
            lista[-1]["q"] = q
        time.sleep(3)
    lista = lista[:8]
    for i, c in enumerate(lista):
        open(f"{salida}/{slug}__{i}.jpg", "wb").write(get(c["thumb"])); time.sleep(2)
    res[slug] = lista
    json.dump(res, open(f"{salida}/cand.json", "w"), ensure_ascii=False, indent=1)
    print(slug[:50], len(lista), flush=True)
# hojas de contactos, 6 notas por hoja
W, H = 330, 186
slugs = list(res)
for h in range(0, len(slugs), 6):
    grupo = slugs[h:h + 6]
    hoja = Image.new("RGB", (W * 4 + 10, (H + 30) * len(grupo)), "white"); d = ImageDraw.Draw(hoja)
    for f, slug in enumerate(grupo):
        y = f * (H + 30)
        d.text((4, y + 2), f"{h + f}. {slug[:90]}", fill="black")
        for i in range(len(res[slug])):
            im = Image.open(f"{salida}/{slug}__{i}.jpg").convert("RGB"); im.thumbnail((W - 6, H))
            hoja.paste(im, (i * W, y + 16)); d.text((i * W + 4, y + 18), str(i), fill="yellow")
    hoja.save(f"{salida}/hoja{h // 6}.jpg", quality=80)

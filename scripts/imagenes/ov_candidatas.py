# Busca en Openverse (fotos de Flickr de uso libre) hasta 8 candidatas por nota y arma hojas de contactos.
# Uso: python3 -I ov_candidatas.py tanda.txt salida   (tanda.txt: "slug | consulta 1 ; consulta 2")
import json, sys, os, time, urllib.parse, urllib.request, urllib.error
from PIL import Image, ImageDraw
UA = "PanoramaUniversalWeb/1.0 (panoramauniversal2024@gmail.com)"
LIC = {"by": "CC BY", "by-sa": "CC BY-SA", "cc0": "CC0", "pdm": "Public domain"}
def get(url):
    for i in range(20):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60).read()
        except urllib.error.HTTPError as e:
            if e.code not in (429, 500, 502, 503, 504): raise
            time.sleep(max(int(e.headers.get("Retry-After") or 0), 10))
        except (urllib.error.URLError, TimeoutError, ConnectionError):
            time.sleep(5)
    raise SystemExit("sin respuesta")
tanda, salida = sys.argv[1], sys.argv[2]
os.makedirs(salida, exist_ok=True)
res = json.load(open(f"{salida}/cand.json")) if os.path.exists(f"{salida}/cand.json") else {}
for linea in open(tanda):
    if "|" not in linea: continue
    slug, consultas = (x.strip() for x in linea.split("|", 1))
    if slug in res: continue
    lista, vistos = [], set()
    for q in consultas.split(";"):
        r = json.loads(get("https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(
            {"q": q.strip(), "license": "by,by-sa,cc0,pdm", "source": "flickr", "aspect_ratio": "wide", "page_size": 12, "mature": "false"})))
        n = 0
        for x in r.get("results", []):
            if x["url"] in vistos or (x.get("width") or 0) < 800: continue
            vistos.add(x["url"]); n += 1
            v = x.get("license_version") or ""
            lic = LIC.get(x["license"], x["license"]) + (f" {v}" if x["license"] in ("by", "by-sa") else "")
            lista.append({"archivo": x["title"], "pagina": x["foreign_landing_url"], "licencia": lic, "autor": x.get("creator") or "",
                          "fuente": "Flickr", "full": x["url"], "thumb": x["url"].replace("_b.jpg", "_n.jpg")})
            if n >= 4: break
        time.sleep(2)
    lista = lista[:8]
    for i, c in enumerate(lista):
        try: open(f"{salida}/{slug}__{i}.jpg", "wb").write(get(c["thumb"]))
        except Exception: open(f"{salida}/{slug}__{i}.jpg", "wb").write(get(c["full"]))
        time.sleep(0.5)
    res[slug] = lista
    json.dump(res, open(f"{salida}/cand.json", "w"), ensure_ascii=False, indent=1)
    print(slug[:50], len(lista), flush=True)
W, H = 330, 190
rows = [(s, k, l[k:k + 4]) for s, l in res.items() for k in range(0, max(len(l), 1), 4)]
for h in range(0, len(rows), 8):
    g = rows[h:h + 8]
    hoja = Image.new("RGB", (W * 4, (H + 28) * len(g)), "white"); d = ImageDraw.Draw(hoja)
    for r, (s, k, l) in enumerate(g):
        y = r * (H + 28); d.text((4, y + 2), s[:60], fill="black")
        for i in range(len(l)):
            im = Image.open(f"{salida}/{s}__{k + i}.jpg").convert("RGB"); im.thumbnail((W - 6, H))
            hoja.paste(im, (i * W, y + 14)); d.text((i * W + 4, y + 16), str(k + i), fill="yellow")
    hoja.save(f"{salida}/h{h // 8}.jpg", quality=78)

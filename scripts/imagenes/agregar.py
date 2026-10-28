# Agrega archivos puntuales de Commons a cand.json: python3 -I agregar.py carpeta slug "Archivo.jpg" ...
import json, sys, re, time, urllib.parse, urllib.request, urllib.error
UA = "PanoramaUniversalWeb/1.0 (panoramauniversal2024@gmail.com)"
carpeta, slug, archivos = sys.argv[1], sys.argv[2], sys.argv[3:]
c = json.load(open(f"{carpeta}/cand.json"))
for a in archivos:
    u = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({"action": "query", "titles": "File:" + a, "prop": "imageinfo", "iiprop": "url|extmetadata", "iiurlwidth": 330, "format": "json"})
    for i in range(8):
        try: r = json.load(urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA}), timeout=30)); break
        except urllib.error.HTTPError: time.sleep(5 * (i + 1))
    ii = next(iter(r["query"]["pages"].values()))["imageinfo"][0]; m = ii["extmetadata"]
    c.setdefault(slug, []).append({"archivo": a, "pagina": ii["descriptionurl"], "licencia": m.get("LicenseShortName", {}).get("value", ""), "thumb": ii["thumburl"],
        "autor": re.sub(r"<[^>]+>", "", m.get("Artist", {}).get("value", "")).strip()})
    print(slug[:20], len(c[slug]) - 1, a, c[slug][-1]["licencia"])
json.dump(c, open(f"{carpeta}/cand.json", "w"), ensure_ascii=False, indent=1)

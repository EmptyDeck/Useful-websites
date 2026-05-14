// ============================================
// KoreaGang — World land polygon loader
// Fetches land-110m.json (TopoJSON) from CDN
// and decodes it into [lat,lon] ring arrays.
// ============================================
(function () {
  'use strict';

  let _cache = null;
  let _loading = null;

  // Minimal TopoJSON arc decoder — only what we need
  function decodeTopojson(topo) {
    const s = topo.transform.scale;
    const t = topo.transform.translate;

    // Delta-decode arcs: each arc is array of [dx,dy] quantized integers
    const arcs = topo.arcs.map(function (arc) {
      var x = 0, y = 0;
      return arc.map(function (pt) {
        x += pt[0]; y += pt[1];
        return [x * s[0] + t[0], y * s[1] + t[1]]; // [lon, lat]
      });
    });

    function arcPts(i) {
      var a = arcs[i < 0 ? ~i : i];
      return i < 0 ? a.slice().reverse() : a;
    }
    function ringPts(arcIdxs) {
      var pts = [];
      arcIdxs.forEach(function (i) { pts = pts.concat(arcPts(i)); });
      return pts;
    }

    var rings = []; // Each entry: [[lat, lon], ...]

    function processGeom(geom) {
      if (!geom) return;
      if (geom.type === 'Polygon') {
        var pts = ringPts(geom.arcs[0]);
        rings.push(pts.map(function (p) { return [p[1], p[0]]; }));
      } else if (geom.type === 'MultiPolygon') {
        geom.arcs.forEach(function (poly) {
          var pts = ringPts(poly[0]);
          rings.push(pts.map(function (p) { return [p[1], p[0]]; }));
        });
      } else if (geom.type === 'GeometryCollection') {
        geom.geometries.forEach(processGeom);
      }
    }

    processGeom(topo.objects.countries);
    return rings;
  }

  async function getLandRings() {
    if (_cache) return _cache;
    if (_loading) return _loading;

    _loading = fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(function (r) { return r.json(); })
      .then(function (topo) {
        _cache = decodeTopojson(topo);
        _loading = null;
        return _cache;
      })
      .catch(function () {
        _loading = null;
        return [];
      });

    return _loading;
  }

  window.KG_GEO = { getLandRings: getLandRings };
})();

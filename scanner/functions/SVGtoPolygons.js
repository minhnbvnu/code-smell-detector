function SVGtoPolygons (svg) {
  const res = [];

  let rx = /<path[^/]+d="([^"]+)"/g;
  let match;
  do {
    match = rx.exec(svg);
    if (match) {
      const path = parseSVGPath(match[1]);
      const contours = getPathContours(path);
      res.push(contours);
    }
  } while (match);

  rx = /<polygon[^/]+points="([^"]+)"/g;
  do {
    match = rx.exec(svg);
    if (match) {
      const points = match[1]
        .split(/\s+/g)
        .map(point => {
          const p = point.split(',');
          return [
            parseFloat(p[0]),
            parseFloat(p[1]),
          ];
        });
      res.push([points]);
    }
  } while (match);

  return res;
}
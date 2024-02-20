function forPageItem(item) {
    var singleGeom, geometries;
    if (item.hidden || item.guides || !testBoundsIntersection(item.visibleBounds, ab.artboardRect)) return;
    // try to convert to circle or rectangle
    // note: filled shapes aren't necessarily closed
    if (item.typename != 'PathItem') return;
    singleGeom = getRectangleData(item.pathPoints) || getCircleData(item.pathPoints);
    if (singleGeom) {
      geometries = [singleGeom];
    } else if (opts.scaled && item.stroked && !item.closed) {
      // try to convert to line segment(s)
      geometries = getLineGeometry(item.pathPoints);
    }
    if (!geometries) return; // item is not convertible to an HTML symbol
    html += exportSymbolAsHtml(item, geometries, abBox, opts);
    items.push(item);
    item.hidden = true;
  }
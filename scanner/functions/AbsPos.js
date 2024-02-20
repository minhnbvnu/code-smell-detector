function AbsPos(id) {
  var e = doc.getElementById(id), r = e.getBoundingClientRect(),
    dd = doc.documentElement, b = doc.body, w = window,
    xs = w.pageXOffset || dd.scrollLeft,
    ys = w.pageYOffset || dd.scrollTop,
    xo = dd.clientLeft || b.clientLeft,
    yo = dd.clientTop || b.clientTop;
  return { x: r.left + xs - xo, y: r.top + ys - yo };
}
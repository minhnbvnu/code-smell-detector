function EventXY(e, c) {
  var xy, p, xmul = parseInt(GetProperty(c, 'width')) / c.width,
    ymul = parseInt(GetProperty(c, 'height')) / c.height;
  if(Defined(e.offsetX)) {
    xy = {x: e.offsetX, y: e.offsetY};
  } else {
    p = AbsPos(c.id);
    if(Defined(e.changedTouches))
      e = e.changedTouches[0];
    if(e.pageX)
      xy = {x: e.pageX - p.x, y: e.pageY - p.y};
  }
  if(xy && xmul && ymul) {
    xy.x /= xmul;
    xy.y /= ymul;
  }
  return xy;
}
function RRect(c, x, y, w, h, r, s) {
  if(r) {
    c.beginPath();
    c.moveTo(x, y + h - r);
    c.arcTo(x, y, x + r, y, r);
    c.arcTo(x + w, y, x + w, y + r, r);
    c.arcTo(x + w, y + h, x + w - r, y + h, r);
    c.arcTo(x, y + h, x, y + h - r, r);
    c.closePath();
    c[s ? 'stroke' : 'fill']();
  } else {
    c[s ? 'strokeRect' : 'fillRect'](x, y, w, h);
  }
}
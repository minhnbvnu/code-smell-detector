function AddShadowToImage(i, w, h, scale, sc, sb, so) {
  var sw = abs(so[0]), sh = abs(so[1]), 
    cw = w + (sw > sb ? sw + sb : sb * 2) * scale,
    ch = h + (sh > sb ? sh + sb : sb * 2) * scale,
    xo = scale * ((sb || 0) + (so[0] < 0 ? sw : 0)),
    yo = scale * ((sb || 0) + (so[1] < 0 ? sh : 0)), cv, c;
  cv = NewCanvas(cw, ch);
  if(!cv)
    return null;
  c = cv.getContext('2d');
  sc && (c.shadowColor = sc);
  sb && (c.shadowBlur = sb * scale);
  so && (c.shadowOffsetX = so[0] * scale, c.shadowOffsetY = so[1] * scale);
  c.drawImage(i, xo, yo, w, h);
  return {image: cv, width: cw / scale, height: ch / scale};
}
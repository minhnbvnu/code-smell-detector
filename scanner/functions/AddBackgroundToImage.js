function AddBackgroundToImage(i, w, h, scale, colour, othickness, ocolour,
  padding, radius, ofill) {
  var cw = w + ((2 * padding) + othickness) * scale,
    ch = h + ((2 * padding) + othickness) * scale,
    cv = NewCanvas(cw, ch), c, x1, y1, x2, y2, ocanvas, cc;
  if(!cv)
    return null;
  othickness *= scale;
  radius *= scale;
  x1 = y1 = othickness / 2;
  x2 = cw - othickness;
  y2 = ch - othickness;
  padding = (padding * scale) + x1; // add space for outline
  c = cv.getContext('2d');
  if(colour) {
    c.fillStyle = colour;
    RRect(c, x1, y1, x2, y2, radius);
  }
  if(othickness) {
    c.strokeStyle = ocolour;
    c.lineWidth = othickness;
    RRect(c, x1, y1, x2, y2, radius, true);
  }
  
  if(ofill) {
    // use compositing to colour in the image and border
    ocanvas = NewCanvas(cw, ch);
    cc = ocanvas.getContext('2d');
    cc.drawImage(i, padding, padding, w, h);
    cc.globalCompositeOperation = 'source-in';
    cc.fillStyle = ocolour;
    cc.fillRect(0, 0, cw, ch);
    cc.globalCompositeOperation = 'destination-over';
    cc.drawImage(cv, 0, 0);
    cc.globalCompositeOperation = 'source-over';
    c.drawImage(ocanvas, 0, 0);
  } else {
    c.drawImage(i, padding, padding, i.width, i.height);
  }
  return {image: cv, width: cw / scale, height: ch / scale};
}
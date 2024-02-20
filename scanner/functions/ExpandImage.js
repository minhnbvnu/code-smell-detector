function ExpandImage(i, w, h) {
  var cv = NewCanvas(w, h), c;
  if(!cv)
    return null;
  c = cv.getContext('2d');
  c.drawImage(i, (w - i.width) / 2, (h - i.height) / 2);
  return cv;
}
function ScaleImage(i, w, h) {
  var cv = NewCanvas(w, h), c;
  if(!cv)
    return null;
  c = cv.getContext('2d');
  c.drawImage(i, 0, 0, w, h);
  return cv;
}
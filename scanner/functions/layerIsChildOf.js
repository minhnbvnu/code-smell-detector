function layerIsChildOf(lyr, lyr2) {
  if (lyr == lyr2) return false;
  while (lyr.typename == 'Layer') {
    if (lyr == lyr2) return true;
    lyr = lyr.parent;
  }
  return false;
}
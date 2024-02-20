function getPickingColor (i) {
  i++;
  return [0, (i & 0xff) / 255, ((i >> 8) & 0xff) / 255];
}
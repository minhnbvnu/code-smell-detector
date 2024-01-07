function resizeImageMask(src, bpc, w1, h1, w2, h2) {
  var length = w2 * h2;
  let dest;

  if (bpc <= 8) {
    dest = new Uint8Array(length);
  } else if (bpc <= 16) {
    dest = new Uint16Array(length);
  } else {
    dest = new Uint32Array(length);
  }

  var xRatio = w1 / w2;
  var yRatio = h1 / h2;
  var i,
      j,
      py,
      newIndex = 0,
      oldIndex;
  var xScaled = new Uint16Array(w2);
  var w1Scanline = w1;

  for (i = 0; i < w2; i++) {
    xScaled[i] = Math.floor(i * xRatio);
  }

  for (i = 0; i < h2; i++) {
    py = Math.floor(i * yRatio) * w1Scanline;

    for (j = 0; j < w2; j++) {
      oldIndex = py + xScaled[j];
      dest[newIndex++] = src[oldIndex];
    }
  }

  return dest;
}
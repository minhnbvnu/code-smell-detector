function canBeSvg(buf) {
  var i = 0, max = buf.length;

  // byte order mark, https://github.com/nodeca/probe-image-size/issues/57
  if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) i = 3;

  while (i < max && isWhiteSpace(buf[i])) i++;

  if (i === max) return false;
  return buf[i] === 0x3c; /* < */
}
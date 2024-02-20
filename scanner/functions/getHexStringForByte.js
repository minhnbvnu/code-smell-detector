function getHexStringForByte(i) {
  const s = Math.round(clamp(i, 0.0, 255.0)).toString(16);

  if (s.length === 1) {
    return "0" + s;
  }

  return s;
}
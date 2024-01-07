function wrapLon(value) {
  const worlds = Math.floor((value + 180) / 360);
  return value - worlds * 360;
}
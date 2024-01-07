function DECtoSEX(angle) {
  // Extract DMS
  const deg = parseInt(angle, 10);
  const min = parseInt((angle - deg) * 60, 10);
  const sec = ((angle - deg) * 60 - min) * 60;

  // Result in degrees sex (dd.mmss)
  return deg + min / 100 + sec / 10000;
}
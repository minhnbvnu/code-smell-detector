function DEGtoSEC(angle) {
  // Extract DMS
  const deg = parseInt(angle, 10);
  let min = parseInt((angle - deg) * 100, 10);
  let sec = ((angle - deg) * 100 - min) * 100;

  // Avoid rounding problems with seconds=0
  const parts = String(angle).split('.');
  if (parts.length == 2 && parts[1].length == 2) {
    min = Number(parts[1]);
    sec = 0;
  }

  // Result in degrees sex (dd.mmss)
  return sec + min * 60 + deg * 3600;
}
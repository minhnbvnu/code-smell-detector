function textIsRotated(textFrame) {
  var m = textFrame.matrix;
  var angle;
  if (m.mValueA == 1 && m.mValueB === 0 && m.mValueC === 0 && m.mValueD == 1) return false;
  angle = Math.atan2(m.mValueB, m.mValueA) * 180 / Math.PI;
  // Treat text rotated by < 1 degree as unrotated.
  // (It's common to accidentally rotate text and then try to unrotate manually).
  return Math.abs(angle) > 1;
}
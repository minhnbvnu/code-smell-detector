function labToLCH(lab) {
  let h = 0; // Because of the discontinuity at 0 if a number is very close to 0 - often due to floating point errors - then
  // it gives unexpected results. EG: 0.000000000001 gives a different result than 0. So just avoid any number
  // that has both a and b very close to zero and lump it in with the h = 0 case.

  if (Math.abs(lab.b) > 0.001 || Math.abs(lab.a) > 0.001) {
    h = radiansToDegrees(Math.atan2(lab.b, lab.a));
  }

  if (h < 0) {
    h += 360;
  }

  const c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  return new ColorLCH(lab.l, c, h);
}
function labToXYZ(lab) {
  const fy = (lab.l + 16) / 116;
  const fx = fy + lab.a / 500;
  const fz = fy - lab.b / 200;
  const xcubed = Math.pow(fx, 3);
  const ycubed = Math.pow(fy, 3);
  const zcubed = Math.pow(fz, 3);
  let x = 0;

  if (xcubed > ColorLAB.epsilon) {
    x = xcubed;
  } else {
    x = (116 * fx - 16) / ColorLAB.kappa;
  }

  let y = 0;

  if (lab.l > ColorLAB.epsilon * ColorLAB.kappa) {
    y = ycubed;
  } else {
    y = lab.l / ColorLAB.kappa;
  }

  let z = 0;

  if (zcubed > ColorLAB.epsilon) {
    z = zcubed;
  } else {
    z = (116 * fz - 16) / ColorLAB.kappa;
  }

  x = ColorXYZ.whitePoint.x * x;
  y = ColorXYZ.whitePoint.y * y;
  z = ColorXYZ.whitePoint.z * z;
  return new ColorXYZ(x, y, z);
}
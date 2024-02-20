function getPinwheelCheckbox(x, y, t) {
  let bladeConstant = 8; // should be an even-numbered integer
  let scaleConstant = 30;
  let scaledTime = t * 6;

  // For reference, see https://www.desmos.com/calculator/sqtr7zw9uq
  return y < scaleConstant * Math.sin(bladeConstant * Math.atan(y/x) + scaledTime);
}
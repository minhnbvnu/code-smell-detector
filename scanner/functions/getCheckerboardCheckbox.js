function getCheckerboardCheckbox(x, y, t) {
  let xOffset = 2*t;
  let yOffset = -1.6*t;
  let sizeValue = 1;

  // For reference, see https://www.desmos.com/calculator/l0nb1db6te
  return Math.cos(x - xOffset) + Math.cos(y - yOffset) + sizeValue > 1;
}
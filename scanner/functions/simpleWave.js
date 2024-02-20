function simpleWave(x, y, t) {
  let frequencyConstant = 3;
  let scaledTime = t * 3;

  // For reference, see https://www.desmos.com/calculator/bp9t79pfa0
  return y < 5 * Math.sin((x - scaledTime) / frequencyConstant);
}
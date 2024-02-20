function complexWave(x, y, t) {
  let frequencyConstant = 3;
  let scaledTime = t * 3;

  return y < 5 * Math.sin((x - scaledTime) / frequencyConstant) - (2 * Math.sin(2 * x - scaledTime));
}
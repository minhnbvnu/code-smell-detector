function roundToPrecisionSmall(i, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(i * factor) / factor;
}
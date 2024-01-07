function getSmoothClampedResolution(resolution, maxResolution, minResolution) {
  let result = Math.min(resolution, maxResolution);
  const ratio = 50;

  result *=
    Math.log(1 + ratio * Math.max(0, resolution / maxResolution - 1)) / ratio +
    1;
  if (minResolution) {
    result = Math.max(result, minResolution);
    result /=
      Math.log(1 + ratio * Math.max(0, minResolution / resolution - 1)) /
        ratio +
      1;
  }
  return clamp(result, minResolution / 2, maxResolution * 2);
}
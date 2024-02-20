function maskToString(mask) {
  const maskArray = Array.isArray(mask) ? mask : [mask];
  const filteredMaskArray = maskArray.filter((part) => isString(part) || isRegexp(part));
  return filteredMaskArray.toString();
}
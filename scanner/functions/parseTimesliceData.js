function parseTimesliceData(data, convertPrimitive) {
  const {currentMajorVersion} = getXVIZConfig();

  return currentMajorVersion === 1
    ? parseTimesliceDataV1(data, convertPrimitive)
    : parseTimesliceDataV2(data, convertPrimitive);
}
function orientFlatCoordinates(flatCoordinates, ends, stride) {
  if (Array.isArray(ends[0])) {
    // MultiPolagon
    if (!linearRingssAreOriented(flatCoordinates, 0, ends, stride)) {
      flatCoordinates = flatCoordinates.slice();
      orientLinearRingsArray(flatCoordinates, 0, ends, stride);
    }
    return flatCoordinates;
  }
  if (!linearRingsAreOriented(flatCoordinates, 0, ends, stride)) {
    flatCoordinates = flatCoordinates.slice();
    orientLinearRings(flatCoordinates, 0, ends, stride);
  }
  return flatCoordinates;
}
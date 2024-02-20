function parsePositions(ps) {
  if (!ps) return [];
  var positions;
  try {
    positions = JSON.parse(ps);
  } catch (e) {
    NVR.debug("error parsing profile");
    return undefined;
  }
  return positions;
}
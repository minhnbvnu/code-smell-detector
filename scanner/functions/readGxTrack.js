function readGxTrack(node, objectStack) {
  const gxTrackObject = pushParseAndPop(
    /** @type {GxTrackObject} */ ({
      coordinates: [],
      whens: [],
    }),
    GX_TRACK_PARSERS,
    node,
    objectStack,
  );
  if (!gxTrackObject) {
    return undefined;
  }
  const flatCoordinates = [];
  const coordinates = gxTrackObject.coordinates;
  const whens = gxTrackObject.whens;
  for (
    let i = 0, ii = Math.min(coordinates.length, whens.length);
    i < ii;
    ++i
  ) {
    if (coordinates[i].length == 3) {
      flatCoordinates.push(
        coordinates[i][0],
        coordinates[i][1],
        coordinates[i][2],
        whens[i],
      );
    }
  }
  return new LineString(flatCoordinates, 'XYZM');
}
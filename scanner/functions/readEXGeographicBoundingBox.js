function readEXGeographicBoundingBox(node, objectStack) {
  const geographicBoundingBox = pushParseAndPop(
    {},
    EX_GEOGRAPHIC_BOUNDING_BOX_PARSERS,
    node,
    objectStack,
  );
  if (!geographicBoundingBox) {
    return undefined;
  }
  const westBoundLongitude =
    /** @type {number|undefined} */
    (geographicBoundingBox['westBoundLongitude']);
  const southBoundLatitude =
    /** @type {number|undefined} */
    (geographicBoundingBox['southBoundLatitude']);
  const eastBoundLongitude =
    /** @type {number|undefined} */
    (geographicBoundingBox['eastBoundLongitude']);
  const northBoundLatitude =
    /** @type {number|undefined} */
    (geographicBoundingBox['northBoundLatitude']);
  if (
    westBoundLongitude === undefined ||
    southBoundLatitude === undefined ||
    eastBoundLongitude === undefined ||
    northBoundLatitude === undefined
  ) {
    return undefined;
  }
  return [
    westBoundLongitude,
    southBoundLatitude,
    eastBoundLongitude,
    northBoundLatitude,
  ];
}
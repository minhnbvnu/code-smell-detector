function latLonAltBoxParser(node, objectStack) {
  const object = pushParseAndPop(
    {},
    LAT_LON_ALT_BOX_PARSERS,
    node,
    objectStack,
  );
  if (!object) {
    return;
  }
  const regionObject = /** @type {Object} */ (
    objectStack[objectStack.length - 1]
  );
  const extent = [
    parseFloat(object['west']),
    parseFloat(object['south']),
    parseFloat(object['east']),
    parseFloat(object['north']),
  ];
  regionObject['extent'] = extent;
  regionObject['altitudeMode'] = object['altitudeMode'];
  regionObject['minAltitude'] = parseFloat(object['minAltitude']);
  regionObject['maxAltitude'] = parseFloat(object['maxAltitude']);
}
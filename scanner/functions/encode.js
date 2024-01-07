function encode(geom) {
  const type = geom.getType();
  const geometryEncoder = GeometryEncoder[type];
  const enc = geometryEncoder(geom);
  let wktType = wktTypeLookup[type];
  if (typeof (/** @type {?} */ (geom).getFlatCoordinates) === 'function') {
    const dimInfo = encodeGeometryLayout(
      /** @type {import("../geom/SimpleGeometry.js").default} */ (geom),
    );
    if (dimInfo.length > 0) {
      wktType += ' ' + dimInfo;
    }
  }
  if (enc.length === 0) {
    return wktType + ' ' + EMPTY;
  }
  return wktType + '(' + enc + ')';
}
function encodeGeometryCollectionGeometry(geom) {
  const array = [];
  const geoms = geom.getGeometries();
  for (let i = 0, ii = geoms.length; i < ii; ++i) {
    array.push(encode(geoms[i]));
  }
  return array.join(',');
}
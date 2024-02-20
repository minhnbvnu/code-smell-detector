function getVerticesInNextRegion(vertices, currentRegion) {
  const nextRegion = getNextRegion(currentRegion);
  if ( !nextRegion ) return [];

  return getVerticesInRegion(vertices, nextRegion);
}
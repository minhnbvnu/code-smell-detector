function fromExtent(extent) {
  if (isEmpty(extent)) {
    throw new Error('Cannot create polygon from empty extent');
  }
  const minX = extent[0];
  const minY = extent[1];
  const maxX = extent[2];
  const maxY = extent[3];
  const flatCoordinates = [
    minX,
    minY,
    minX,
    maxY,
    maxX,
    maxY,
    maxX,
    minY,
    minX,
    minY,
  ];
  return new Polygon(flatCoordinates, 'XY', [flatCoordinates.length]);
}
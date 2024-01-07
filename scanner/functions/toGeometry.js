function toGeometry(renderFeature) {
  const geometryType = renderFeature.getType();
  switch (geometryType) {
    case 'Point':
      return new Point(renderFeature.getFlatCoordinates());
    case 'MultiPoint':
      return new MultiPoint(renderFeature.getFlatCoordinates(), 'XY');
    case 'LineString':
      return new LineString(renderFeature.getFlatCoordinates(), 'XY');
    case 'MultiLineString':
      return new MultiLineString(
        renderFeature.getFlatCoordinates(),
        'XY',
        /** @type {Array<number>} */ (renderFeature.getEnds()),
      );
    case 'Polygon':
      const flatCoordinates = renderFeature.getFlatCoordinates();
      const ends = renderFeature.getEnds();
      const endss = inflateEnds(flatCoordinates, ends);
      return endss.length > 1
        ? new MultiPolygon(flatCoordinates, 'XY', endss)
        : new Polygon(flatCoordinates, 'XY', ends);
    default:
      throw new Error('Invalid geometry type:' + geometryType);
  }
}
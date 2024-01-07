function getMode(type) {
  switch (type) {
    case 'Point':
    case 'MultiPoint':
      return 'Point';
    case 'LineString':
    case 'MultiLineString':
      return 'LineString';
    case 'Polygon':
    case 'MultiPolygon':
      return 'Polygon';
    case 'Circle':
      return 'Circle';
    default:
      throw new Error('Invalid type: ' + type);
  }
}
function flattenFeature(feature, options) {
    const { geometry } = feature;
    if (geometry.type === "GeometryCollection") {
      throw new Error("GeometryCollection type not supported");
    }
    const data = [];
    const indices = [];
    let areas;
    let type;
    switch (geometry.type) {
      case "Point":
        type = "Point";
        flattenPoint(geometry.coordinates, data, indices, options);
        break;
      case "MultiPoint":
        type = "Point";
        geometry.coordinates.map((c) => flattenPoint(c, data, indices, options));
        break;
      case "LineString":
        type = "LineString";
        flattenLineString(geometry.coordinates, data, indices, options);
        break;
      case "MultiLineString":
        type = "LineString";
        geometry.coordinates.map((c) => flattenLineString(c, data, indices, options));
        break;
      case "Polygon":
        type = "Polygon";
        areas = [];
        flattenPolygon(geometry.coordinates, data, indices, areas, options);
        break;
      case "MultiPolygon":
        type = "Polygon";
        areas = [];
        geometry.coordinates.map((c) => flattenPolygon(c, data, indices, areas, options));
        break;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
    return { ...feature, geometry: { type, indices, data, areas } };
  }
function processGeoJSON (geojson, options) {
  if (!geojson || !geojson.features.length) {
    postMessage('error'); // TODO: not really an error
    return;
  }

  const tri = {
    vertices: [],
    normals: [],
    colors: [],
    texCoords: [],
    heights: [],
    pickingColors: []
  };

  const
    items = [],
    origin = getOrigin(geojson.features[0].geometry),
    position = { latitude: origin[1], longitude: origin[0] };

  geojson.features.forEach((feature, index) => {
    // APP.events.emit('loadfeature', feature); // TODO

    const
      properties = feature.properties,
      id = options.id || feature.id,
      pickingColor = getPickingColor(index); // picks per part id - could perhaps use building id

    let vertexCount = tri.vertices.length;
    triangulate(tri, feature, origin);
    vertexCount = (tri.vertices.length - vertexCount) / 3;

    for (let i = 0; i < vertexCount; i++) {
      tri.heights.push(properties.height);
      tri.pickingColors.push(...pickingColor);
    }

    properties.bounds = getGeoJSONBounds(feature.geometry);
    items.push({ id: id, properties: properties, vertexCount: vertexCount });
  });

  postResult(items, position, tri);
}
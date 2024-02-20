function addLayers(ctx) {
  // drawn features style
  ctx.map.addSource(Constants.sources.COLD, {
    data: {
      type: Constants.geojsonTypes.FEATURE_COLLECTION,
      features: []
    },
    type: 'geojson'
  });

  // hot features style
  ctx.map.addSource(Constants.sources.HOT, {
    data: {
      type: Constants.geojsonTypes.FEATURE_COLLECTION,
      features: [{
        type: 'Feature',
        properties: {
          meta: 'feature',
          id: 'foo'
        },
        geometry: {
          type: 'LineString',
          coordinates: [[0, 0], [1, 1], [2, 2]]
        }
      }, {
        type: 'Feature',
        properties: {
          meta: 'nothing',
          id: 'bar'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[[1, 1], [2, 2], [3, 3], [4, 4], [1, 1]]]
        }
      }, {
        type: 'Feature',
        properties: {
          meta: 'vertex',
          id: 'baz'
        },
        geometry: {
          type: 'Point',
          coordinates: [10, 10]
        }
      }, {
        type: 'Feature',
        properties: {
          meta: 'vertex',
          id: 'baz'
        },
        geometry: {
          type: 'Point',
          coordinates: [10, 10]
        }
      }]
    },
    type: 'geojson'
  });

  ctx.options.styles.forEach((style) => {
    ctx.map.addLayer(style);
  });
}
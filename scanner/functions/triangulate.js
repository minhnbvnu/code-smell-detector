function triangulate(buffers, feature, origin, forcedColor, colorVariance) {
    const scale = [METERS_PER_DEGREE_LATITUDE*Math.cos(origin[1]/180*Math.PI), METERS_PER_DEGREE_LATITUDE];

    // a single feature might split into several items
    alignGeometry(feature.geometry).map(geometry => {
      const polygon = transform(geometry, origin, scale);
      addBuilding(buffers, feature.properties, polygon, forcedColor, colorVariance);
    });
  }
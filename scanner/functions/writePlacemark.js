function writePlacemark(node, feature, objectStack) {
  const /** @type {import("../xml.js").NodeStackItem} */ context = {node: node};

  // set id
  if (feature.getId()) {
    node.setAttribute('id', /** @type {string} */ (feature.getId()));
  }

  // serialize properties (properties unknown to KML are not serialized)
  const properties = feature.getProperties();

  // don't export these to ExtendedData
  const filter = {
    'address': 1,
    'description': 1,
    'name': 1,
    'open': 1,
    'phoneNumber': 1,
    'styleUrl': 1,
    'visibility': 1,
  };
  filter[feature.getGeometryName()] = 1;
  const keys = Object.keys(properties || {})
    .sort()
    .filter(function (v) {
      return !filter[v];
    });

  const styleFunction = feature.getStyleFunction();
  if (styleFunction) {
    // FIXME the styles returned by the style function are supposed to be
    // resolution-independent here
    const styles = styleFunction(feature, 0);
    if (styles) {
      const styleArray = Array.isArray(styles) ? styles : [styles];
      let pointStyles = styleArray;
      if (feature.getGeometry()) {
        pointStyles = styleArray.filter(function (style) {
          const geometry = style.getGeometryFunction()(feature);
          if (geometry) {
            const type = geometry.getType();
            if (type === 'GeometryCollection') {
              return /** @type {GeometryCollection} */ (geometry)
                .getGeometriesArrayRecursive()
                .filter(function (geometry) {
                  const type = geometry.getType();
                  return type === 'Point' || type === 'MultiPoint';
                }).length;
            }
            return type === 'Point' || type === 'MultiPoint';
          }
        });
        ('Point');
      }
      if (this.writeStyles_) {
        let lineStyles = styleArray;
        let polyStyles = styleArray;
        if (feature.getGeometry()) {
          lineStyles = styleArray.filter(function (style) {
            const geometry = style.getGeometryFunction()(feature);
            if (geometry) {
              const type = geometry.getType();
              if (type === 'GeometryCollection') {
                return /** @type {GeometryCollection} */ (geometry)
                  .getGeometriesArrayRecursive()
                  .filter(function (geometry) {
                    const type = geometry.getType();
                    return type === 'LineString' || type === 'MultiLineString';
                  }).length;
              }
              return type === 'LineString' || type === 'MultiLineString';
            }
          });
          polyStyles = styleArray.filter(function (style) {
            const geometry = style.getGeometryFunction()(feature);
            if (geometry) {
              const type = geometry.getType();
              if (type === 'GeometryCollection') {
                return /** @type {GeometryCollection} */ (geometry)
                  .getGeometriesArrayRecursive()
                  .filter(function (geometry) {
                    const type = geometry.getType();
                    return type === 'Polygon' || type === 'MultiPolygon';
                  }).length;
              }
              return type === 'Polygon' || type === 'MultiPolygon';
            }
          });
        }
        properties['Style'] = {
          pointStyles: pointStyles,
          lineStyles: lineStyles,
          polyStyles: polyStyles,
        };
      }
      if (pointStyles.length && properties['name'] === undefined) {
        const textStyle = pointStyles[0].getText();
        if (textStyle) {
          properties['name'] = textStyle.getText();
        }
      }
    }
  }
  const parentNode = objectStack[objectStack.length - 1].node;
  const orderedKeys = PLACEMARK_SEQUENCE[parentNode.namespaceURI];
  const values = makeSequence(properties, orderedKeys);
  pushSerializeAndPop(
    context,
    PLACEMARK_SERIALIZERS,
    OBJECT_PROPERTY_NODE_FACTORY,
    values,
    objectStack,
    orderedKeys,
  );

  if (keys.length > 0) {
    const sequence = makeSequence(properties, keys);
    const namesAndValues = {names: keys, values: sequence};
    pushSerializeAndPop(
      context,
      PLACEMARK_SERIALIZERS,
      EXTENDEDDATA_NODE_FACTORY,
      [namesAndValues],
      objectStack,
    );
  }

  // serialize geometry
  const options = /** @type {import("./Feature.js").WriteOptions} */ (
    objectStack[0]
  );
  let geometry = feature.getGeometry();
  if (geometry) {
    geometry = transformGeometryWithOptions(geometry, true, options);
  }
  pushSerializeAndPop(
    context,
    PLACEMARK_SERIALIZERS,
    GEOMETRY_NODE_FACTORY,
    [geometry],
    objectStack,
  );
}
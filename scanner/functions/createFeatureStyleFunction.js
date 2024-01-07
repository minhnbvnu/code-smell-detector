function createFeatureStyleFunction(
  style,
  styleUrl,
  defaultStyle,
  sharedStyles,
  showPointNames,
) {
  return (
    /**
     * @param {Feature} feature feature.
     * @param {number} resolution Resolution.
     * @return {Array<Style>|Style} Style.
     */
    function (feature, resolution) {
      let drawName = showPointNames;
      let name = '';
      let multiGeometryPoints = [];
      if (drawName) {
        const geometry = feature.getGeometry();
        if (geometry) {
          if (geometry instanceof GeometryCollection) {
            multiGeometryPoints = geometry
              .getGeometriesArrayRecursive()
              .filter(function (geometry) {
                const type = geometry.getType();
                return type === 'Point' || type === 'MultiPoint';
              });
            drawName = multiGeometryPoints.length > 0;
          } else {
            const type = geometry.getType();
            drawName = type === 'Point' || type === 'MultiPoint';
          }
        }
      }

      if (drawName) {
        name = /** @type {string} */ (feature.get('name'));
        drawName = drawName && !!name;
        // convert any html character codes
        if (drawName && /&[^&]+;/.test(name)) {
          if (!TEXTAREA) {
            TEXTAREA = document.createElement('textarea');
          }
          TEXTAREA.innerHTML = name;
          name = TEXTAREA.value;
        }
      }

      let featureStyle = defaultStyle;
      if (style) {
        featureStyle = style;
      } else if (styleUrl) {
        featureStyle = findStyle(styleUrl, defaultStyle, sharedStyles);
      }
      if (drawName) {
        const nameStyle = createNameStyleFunction(featureStyle[0], name);
        if (multiGeometryPoints.length > 0) {
          // in multigeometries restrict the name style to points and create a
          // style without image or text for geometries requiring fill or stroke
          // including any polygon specific style if there is one
          nameStyle.setGeometry(new GeometryCollection(multiGeometryPoints));
          const baseStyle = new Style({
            geometry: featureStyle[0].getGeometry(),
            image: null,
            fill: featureStyle[0].getFill(),
            stroke: featureStyle[0].getStroke(),
            text: null,
          });
          return [nameStyle, baseStyle].concat(featureStyle.slice(1));
        }
        return nameStyle;
      }
      return featureStyle;
    }
  );
}
function featureCallback(feature, geometry) {
      const imageData = context.getImageData(
        0,
        0,
        contextSize,
        contextSize,
      ).data;
      for (let i = 0, ii = indexes.length; i < ii; i++) {
        if (imageData[indexes[i]] > 0) {
          if (
            !declutteredFeatures ||
            (builderType !== 'Image' && builderType !== 'Text') ||
            declutteredFeatures.includes(feature)
          ) {
            const idx = (indexes[i] - 3) / 4;
            const x = hitTolerance - (idx % contextSize);
            const y = hitTolerance - ((idx / contextSize) | 0);
            const result = callback(feature, geometry, x * x + y * y);
            if (result) {
              return result;
            }
          }
          context.clearRect(0, 0, contextSize, contextSize);
          break;
        }
      }
      return undefined;
    }
function applyLookup(pixelsData, lookupData) {
          var data = pixelsData.data;
          for (var i = 0; i < data.length; i += 4) {
            data[i] = lookupData[data[i]];
            data[i + 1] = lookupData[data[i + 1]];
            data[i + 2] = lookupData[data[i + 2]];
          }
          return pixelsData;
        }
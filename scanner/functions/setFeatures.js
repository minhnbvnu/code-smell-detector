function setFeatures(datalayer) {
      datalayer.eachLayer(function (layer) {
        if (!poly && layer instanceof L.Polygon) {
          poly = layer
        }
        if (!marker && layer instanceof L.Marker) {
          marker = layer
        }
      })
    }
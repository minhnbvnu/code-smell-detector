function addLayersFrom(layerGroup) {
      layerGroup.forEach(function (layer) {
        if (layer instanceof LayerGroup) {
          addLayersFrom(layer.getLayers());
        } else {
          layers.push(layer);
        }
      });
    }
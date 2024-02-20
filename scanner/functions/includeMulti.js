function includeMulti(Klass, type) {
    Klass.include({
      toGeoJSON: function () {
        var coords = [];

        this.eachLayer(function (layer) {
          coords.push(layer.toGeoJSON().geometry.coordinates);
        });

        return L.GeoJSON.getFeature(this, {
          type: type,
          coordinates: coords
        });
      }
    });
  }
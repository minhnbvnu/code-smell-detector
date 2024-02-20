function addUserMarker(c, text) {
    var geom = new Point([
        c[0] + Math.floor(Math.random()) * 20,
        c[1] - Math.floor(Math.random()) * 20,
    ]);
    var feature = new Feature(geom);
    feature.set('name', text);
    sourceUsers.addFeature(feature);
}
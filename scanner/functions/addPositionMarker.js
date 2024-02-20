function addPositionMarker(c) {
    var geom = new Point(c);
    var feature = new Feature(geom);
    source.addFeature(feature);
}
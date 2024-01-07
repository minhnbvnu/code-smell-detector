function getTestPoints(geometry, context) {
    var layer = context.layer,
        map = layer.getMap();
    var coordinates = [
        geometry.getCenter(),
        geometry.getFirstCoordinate(),
        geometry.getLastCoordinate()
    ];
    var points = [];
    for (var i = 0; i < coordinates.length; i++) {
        points.push(map.coordinateToContainerPoint(coordinates[i]));
    }
    return points;
}
function writePoint(point, pbf) {
    var coords = [];
    for (var i = 0; i < dim; i++) coords.push(Math.round(point[i] * e));
    pbf.writePackedSVarint(3, coords);
}
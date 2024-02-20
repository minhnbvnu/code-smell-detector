function readGeometry(pbf, geom) {
    geom.type = 'Point';
    return pbf.readMessage(readGeometryField, geom);
}
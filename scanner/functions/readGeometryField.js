function readGeometryField(tag, geom, pbf) {
    if (tag === 1) geom.type = geometryTypes[pbf.readVarint()];

    else if (tag === 2) lengths = pbf.readPackedVarint();
    else if (tag === 3) readCoords(geom, pbf, geom.type);
    else if (tag === 4) {
        geom.geometries = geom.geometries || [];
        geom.geometries.push(readGeometry(pbf, {}));
    }
    else if (tag === 13) values.push(readValue(pbf));
    else if (tag === 15) readProps(pbf, geom);
}
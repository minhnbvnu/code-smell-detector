function readPoint(pbf) {
    var end = pbf.readVarint() + pbf.pos,
        coords = [];
    while (pbf.pos < end) coords.push(pbf.readSVarint() / e);
    return coords;
}
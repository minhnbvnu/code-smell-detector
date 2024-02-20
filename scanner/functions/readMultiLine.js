function readMultiLine(pbf, closed) {
    var end = pbf.readVarint() + pbf.pos;
    if (!lengths) return [readLinePart(pbf, end, null, closed)];

    var coords = [];
    for (var i = 0; i < lengths.length; i++) coords.push(readLinePart(pbf, end, lengths[i], closed));
    lengths = null;
    return coords;
}
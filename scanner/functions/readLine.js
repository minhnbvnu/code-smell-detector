function readLine(pbf) {
    return readLinePart(pbf, pbf.readVarint() + pbf.pos);
}
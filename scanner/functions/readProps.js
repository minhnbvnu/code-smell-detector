function readProps(pbf, props) {
    var end = pbf.readVarint() + pbf.pos;
    while (pbf.pos < end) props[keys[pbf.readVarint()]] = values[pbf.readVarint()];
    values = [];
    return props;
}
function layerPBFReader(tag, layer, pbf) {
  if (tag === 15) {
    layer.version = pbf.readVarint();
  } else if (tag === 1) {
    layer.name = pbf.readString();
  } else if (tag === 5) {
    layer.extent = pbf.readVarint();
  } else if (tag === 2) {
    layer.features.push(pbf.pos);
  } else if (tag === 3) {
    layer.keys.push(pbf.readString());
  } else if (tag === 4) {
    let value = null;
    const end = pbf.readVarint() + pbf.pos;
    while (pbf.pos < end) {
      tag = pbf.readVarint() >> 3;
      value =
        tag === 1
          ? pbf.readString()
          : tag === 2
            ? pbf.readFloat()
            : tag === 3
              ? pbf.readDouble()
              : tag === 4
                ? pbf.readVarint64()
                : tag === 5
                  ? pbf.readVarint()
                  : tag === 6
                    ? pbf.readSVarint()
                    : tag === 7
                      ? pbf.readBoolean()
                      : null;
    }
    layer.values.push(value);
  }
}
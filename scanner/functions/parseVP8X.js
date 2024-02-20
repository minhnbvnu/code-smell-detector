function parseVP8X(data, offset) {
  return  {
    // TODO: replace with `data.readUIntLE(8, 3) + 1`
    //       when 0.10 support is dropped
    width:  ((data[offset + 6] << 16) | (data[offset + 5] << 8) | data[offset + 4]) + 1,
    height: ((data[offset + 9] << offset) | (data[offset + 8] << 8) | data[offset + 7]) + 1,
    type:   'webp',
    mime:   'image/webp',
    wUnits: 'px',
    hUnits: 'px'
  };
}
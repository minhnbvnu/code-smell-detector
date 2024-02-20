function parseVP8L(data, offset) {
  if (data[offset] !== 0x2F) return;

  var bits = readUInt32LE(data, offset + 1);

  return {
    width:  (bits & 0x3FFF) + 1,
    height: ((bits >> 14) & 0x3FFF) + 1,
    type:   'webp',
    mime:   'image/webp',
    wUnits: 'px',
    hUnits: 'px'
  };
}
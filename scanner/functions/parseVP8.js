function parseVP8(data, offset) {
  if (data[offset + 3] !== 0x9D || data[offset + 4] !== 0x01 || data[offset + 5] !== 0x2A) {
    // bad code block signature
    return;
  }

  return {
    width:  readUInt16LE(data, offset + 6) & 0x3FFF,
    height: readUInt16LE(data, offset + 8) & 0x3FFF,
    type:   'webp',
    mime:   'image/webp',
    wUnits: 'px',
    hUnits: 'px'
  };
}
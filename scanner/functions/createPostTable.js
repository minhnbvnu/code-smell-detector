function createPostTable(properties) {
    var angle = Math.floor(properties.italicAngle * 2 ** 16);
    return "\x00\x03\x00\x00" + (0, _util.string32)(angle) + "\x00\x00" + "\x00\x00" + (0, _util.string32)(properties.fixedPitch) + "\x00\x00\x00\x00" + "\x00\x00\x00\x00" + "\x00\x00\x00\x00" + "\x00\x00\x00\x00";
  }
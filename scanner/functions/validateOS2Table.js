function validateOS2Table(os2) {
    var stream = new Stream(os2.data);
    var version = stream.getUint16();
    // TODO verify all OS/2 tables fields, but currently we validate only those
    // that give us issues
    stream.getBytes(60); // skipping type, misc sizes, panose, unicode ranges
    var selection = stream.getUint16();
    if (version < 4 && (selection & 0x0300)) {
      return false;
    }
    var firstChar = stream.getUint16();
    var lastChar = stream.getUint16();
    if (firstChar > lastChar) {
      return false;
    }
    stream.getBytes(6); // skipping sTypoAscender/Descender/LineGap
    var usWinAscent = stream.getUint16();
    if (usWinAscent === 0) { // makes font unreadable by windows
      return false;
    }

    // OS/2 appears to be valid, resetting some fields
    os2.data[8] = os2.data[9] = 0; // IE rejects fonts if fsType != 0
    return true;
  }
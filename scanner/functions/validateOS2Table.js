function validateOS2Table(os2, file) {
    file.pos = (file.start || 0) + os2.offset;
    var version = file.getUint16();
    file.skip(60);
    var selection = file.getUint16();

    if (version < 4 && selection & 0x0300) {
      return false;
    }

    var firstChar = file.getUint16();
    var lastChar = file.getUint16();

    if (firstChar > lastChar) {
      return false;
    }

    file.skip(6);
    var usWinAscent = file.getUint16();

    if (usWinAscent === 0) {
      return false;
    }

    os2.data[8] = os2.data[9] = 0;
    return true;
  }
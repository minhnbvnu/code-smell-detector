function isType1File(file) {
    var header = file.peekBytes(2);

    if (header[0] === 0x25 && header[1] === 0x21) {
      return true;
    }

    if (header[0] === 0x80 && header[1] === 0x01) {
      return true;
    }

    return false;
  }
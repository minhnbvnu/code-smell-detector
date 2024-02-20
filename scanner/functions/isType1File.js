function isType1File(file) {
    var header = file.peekBytes(2);
    // All Type1 font programs must begin with the comment '%!' (0x25 + 0x21).
    if (header[0] === 0x25 && header[1] === 0x21) {
      return true;
    }
    // ... obviously some fonts violate that part of the specification,
    // please refer to the comment in |Type1Font| below.
    if (header[0] === 0x80 && header[1] === 0x01) { // pfb file header.
      return true;
    }
    return false;
  }
function isTrueTypeFile(file) {
    var header = file.peekBytes(4);
    return readUint32(header, 0) === 0x00010000;
  }
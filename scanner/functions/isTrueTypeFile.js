function isTrueTypeFile(file) {
    var header = file.peekBytes(4);
    return (0, _core_utils.readUint32)(header, 0) === 0x00010000 || (0, _util.bytesToString)(header) === "true";
  }
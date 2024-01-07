function isOpenTypeFile(file) {
    var header = file.peekBytes(4);
    return (0, _util.bytesToString)(header) === "OTTO";
  }
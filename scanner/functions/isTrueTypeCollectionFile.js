function isTrueTypeCollectionFile(file) {
    const header = file.peekBytes(4);
    return (0, _util.bytesToString)(header) === "ttcf";
  }
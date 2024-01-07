function StringStream(str) {
    const bytes = (0, _util.stringToBytes)(str);
    Stream.call(this, bytes);
  }
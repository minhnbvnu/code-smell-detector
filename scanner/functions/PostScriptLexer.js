constructor(stream) {
    this.stream = stream;
    this.nextChar();
    this.strBuf = [];
  }
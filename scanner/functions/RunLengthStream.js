function RunLengthStream(str, maybeLength) {
    this.str = str;
    this.dict = str.dict;
    DecodeStream.call(this, maybeLength);
  }
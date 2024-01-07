function Ascii85Stream(str, maybeLength) {
    this.str = str;
    this.dict = str.dict;
    this.input = new Uint8Array(5);

    if (maybeLength) {
      maybeLength = 0.8 * maybeLength;
    }

    DecodeStream.call(this, maybeLength);
  }
function AsciiHexStream(str, maybeLength) {
    this.str = str;
    this.dict = str.dict;
    this.firstDigit = -1;

    if (maybeLength) {
      maybeLength = 0.5 * maybeLength;
    }

    DecodeStream.call(this, maybeLength);
  }
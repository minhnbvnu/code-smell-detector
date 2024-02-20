function FakeStream(stream) {
    this.dict = stream.dict;
    DecodeStream.call(this);
  }
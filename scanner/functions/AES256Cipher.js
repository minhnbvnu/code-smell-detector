constructor(key) {
    super();
    this._cyclesOfRepetition = 14;
    this._keySize = 224;
    this._key = this._expandKey(key);
  }
function NGramParser(theNgramList, theByteMap) {
  var N_GRAM_MASK = 0xFFFFFF;

  this.byteIndex = 0;
  this.ngram = 0;

  this.ngramList = theNgramList;
  this.byteMap = theByteMap;

  this.ngramCount = 0;
  this.hitCount = 0;

  this.spaceChar;

  /*
   * Binary search for value in table, which must have exactly 64 entries.
   */
  this.search = function(table, value) {
    var index = 0;

    if (table[index + 32] <= value) index += 32;
    if (table[index + 16] <= value) index += 16;
    if (table[index + 8]  <= value) index += 8;
    if (table[index + 4]  <= value) index += 4;
    if (table[index + 2]  <= value) index += 2;
    if (table[index + 1]  <= value) index += 1;
    if (table[index]      > value)  index -= 1;

    if (index < 0 || table[index] != value)
      return -1;

    return index;
  };

  this.lookup = function(thisNgram) {
    this.ngramCount += 1;
    if (this.search(this.ngramList, thisNgram) >= 0) {
      this.hitCount += 1;
    }
  };

  this.addByte = function(b) {
    this.ngram = ((this.ngram << 8) + (b & 0xFF)) & N_GRAM_MASK;
    this.lookup(this.ngram);
  }

  this.nextByte = function(det) {
    if (this.byteIndex >= det.fInputLen)
      return -1;

    return det.fInputBytes[this.byteIndex++] & 0xFF;
  }

  this.parse = function(det, spaceCh) {
    var b, ignoreSpace = false;
    this.spaceChar = spaceCh;

    while ((b = this.nextByte(det)) >= 0) {
      var mb = this.byteMap[b];

      // TODO: 0x20 might not be a space in all character sets...
      if (mb != 0) {
        if (!(mb == this.spaceChar && ignoreSpace)) {
          this.addByte(mb);
        }

        ignoreSpace = (mb == this.spaceChar);
      }
    }

    // TODO: Is this OK? The buffer could have ended in the middle of a word...
    this.addByte(this.spaceChar);

    var rawPercent = this.hitCount / this.ngramCount;

    // TODO - This is a bit of a hack to take care of a case
    // were we were getting a confidence of 135...
    if (rawPercent > 0.33)
      return 98;

    return Math.floor(rawPercent * 300.0);
  };
}
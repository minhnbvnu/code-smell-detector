function IteratedChar() {

  this.charValue = 0; // 1-4 bytes from the raw input data
  this.index     = 0;
  this.nextIndex = 0;
  this.error     = false;
  this.done      = false;

  this.reset = function() {
    this.charValue = 0;
    this.index     = -1;
    this.nextIndex = 0;
    this.error     = false;
    this.done      = false;
  };

  this.nextByte = function(det) {
    if (this.nextIndex >= det.fRawLength) {
      this.done = true;
      return -1;
    }
    var byteValue = det.fRawInput[this.nextIndex++] & 0x00ff;
    return byteValue;
  };
}
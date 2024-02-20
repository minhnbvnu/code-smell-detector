function GameBoyContext() {
  this.createBuffer = function() {
    return new Buffer();
  }
  this.createImageData = function (w, h) {
    var result = {};
    // The following line was updated since Octane 1.0 to avoid OOB access.
    result.data = new Uint8Array(w * h * 4);
    return result;
  }
  this.putImageData = function (buffer, x, y) {
    var sum = 0;
    for (var i = 0; i < buffer.data.length; i++) {
      sum += i * buffer.data[i];
      sum = sum % 1000;
    }
  }
  this.drawImage = function () { }
}
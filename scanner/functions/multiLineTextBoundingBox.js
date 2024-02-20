function multiLineTextBoundingBox(textObj) {
  var top = Number.POSITIVE_INFINITY;
  var left = Number.POSITIVE_INFINITY;
  var bottom = Number.NEGATIVE_INFINITY;
  var right = Number.NEGATIVE_INFINITY;
  var matrix = [1, 0, 0, 1, 0, 0];
  var firstLineFontSize;
  var lastY = Number.POSITIVE_INFINITY;
  if (/matrix/i.test(textObj.transform)) {
    matrix = helper.matrixStrToArr(textObj.transform.trim());
  }

  textObj.children.forEach(function (tspanObj) {
    var fontSize = parseFloat(tspanObj['font-size'].trim());
    var letterSpacing = tspanObj['letter-spacing'];
    var unicodeLength = getUnicodeLength(tspanObj.text);
    var w = unicodeLength / 2 * fontSize + (tspanObj.text.length - 1) * letterSpacing;
    var h = fontSize;
    var t = tspanObj.y;
    var l = tspanObj.x;
    var b = t + h;
    var r = l + w;
    if (t < top) top = t;
    if (l < left) left = l;
    if (b > bottom) bottom = b;
    if (r > right) right = r;
    if (lastY > t) {
      lastY = t;
      firstLineFontSize = fontSize;
    }
  });

  return {
    left: matrix[0] * left + matrix[2] * top + matrix[4],
    top: matrix[1] * left + matrix[3] * top + matrix[5] - Math.round(0.8808 * firstLineFontSize - 0.3333),
    right: matrix[0] * right + matrix[2] * bottom + matrix[4],
    bottom: matrix[1] * right + matrix[3] * bottom + matrix[5] - Math.round(0.8808 * firstLineFontSize - 0.3333),
    _wh: function () {
      delete this._wh;
      this.width = this.right - this.left;
      this.height = this.bottom - this.top;
      return this;
    }
  }._wh();
}
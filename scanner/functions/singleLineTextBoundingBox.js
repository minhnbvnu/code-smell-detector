function singleLineTextBoundingBox(textObj) {
  var x = 0;
  var y = 0;
  var fontSize = parseFloat(textObj['font-size']);
  var letterSpacing = textObj['letter-spacing'];
  var unicodeLength = getUnicodeLength(textObj.text);
  var matrix;
  if (/matrix/i.test(textObj.transform)) {
    matrix = helper.matrixStrToArr(textObj.transform.trim());
    x = matrix[4];
    y = matrix[5];
  }
  if (typeof textObj.x === 'number') x = textObj.x;
  if (typeof textObj.y === 'number') y = textObj.y;

  // By setting y value of an text object to Math.round(0.8808*fontSize - 0.3333)
  // it just snaps to the top of the SVG wrapper
  // The formula comes from curve fitting tool in Matlab
  // https://img.alicdn.com/tps/TB1CJu.PpXXXXXcaXXXXXXXXXXX-2053-1236.jpg
  return {
    top: y - Math.round(0.8808 * fontSize - 0.3333),
    left: x,
    width: unicodeLength / 2 * fontSize + (textObj.text.length - 1) * letterSpacing,
    height: fontSize,
    _init: function () {
      delete this._init;
      this.right = this.left + this.width;
      this.bottom = this.top + this.height;
      return this;
    }
  }._init();
}
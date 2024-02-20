function LinearGradient(stops, x1, y1, x2, y2) {
  var type = LINEAR_GRADIENT;

  if (arguments.length < 5) {
    var angle = ((x1 == null) ? 270 : x1) * Math.PI / 180;

    var x = Math.cos(angle);
    var y = -Math.sin(angle);
    var l = (Math.abs(x) + Math.abs(y)) / 2;

    x *= l; y *= l;

    x1 = 0.5 - x;
    x2 = 0.5 + x;
    y1 = 0.5 - y;
    y2 = 0.5 + y;
    this._bb = true;
  } else {
    this._bb = false;
  }

  var brushData = [type, +x1, +y1, +x2, +y2];
  insertColorStopsIntoArray(stops, brushData, 5);
  this._brush = brushData;
}
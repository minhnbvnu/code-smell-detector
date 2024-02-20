function boundingRectOfEllipse(ellipse, shouldReturnTrueBounding) {
  ellipse = element_object(ellipse);

  var cx = ellipse.cx || 0;
  var cy = ellipse.cy || 0;
  var rx = ellipse.rx;
  var ry = ellipse.ry;
  var l = cx - rx;
  var t = cy - ry;
  var r = l + 2 * rx;
  var b = t + 2 * ry;

  var transform = ellipse.transform;
  var matrix;
  if (transform) {
    matrix = helper.matrixStrToObj(transform);

    if (shouldReturnTrueBounding) {
      // https://img.alicdn.com/tfscom/TB1iZqOPFXXXXceXpXXXXXXXXXX.jpg
      var ma = matrix.a;
      var mb = matrix.b;
      var mc = matrix.c;
      var md = matrix.d;
      var me = matrix.e;
      var mf = matrix.f;
      var denominator = ma * md - mb * mc;
      var A = ry * ry * md * md + rx * rx * mb * mb;
      var B = -2 * (mc * md * ry * ry + ma * mb * rx * rx);
      var C = ry * ry * mc * mc + rx * rx * ma * ma;
      var D = 2 * ry * ry * (mc * md * mf - md * md * me) + 2 * rx * rx * (ma * mb * mf - mb * mb * me) - 2 * (cx * ry * ry * md - cy * rx * rx * mb) * denominator;
      var E = 2 * ry * ry * (mc * md * me - mc * mc * mf) + 2 * rx * rx * (ma * mb * me - ma * ma * mf) + 2 * (cx * ry * ry * mc - cy * rx * rx * ma) * denominator;
      var F = ry * ry * (mc * mc * mf * mf - 2 * mc * md * me * mf + md * md * me * me) + rx * rx * (ma * ma * mf * mf - 2 * ma * mb * me * mf + mb * mb * me * me) + (2 * cx * ry * ry * (md * me - mc * mf) + 2 * cy * rx * rx * (ma * mf - mb * me)) * denominator + (ry * ry * cx * cx + rx * rx * cy * cy - rx * rx * ry * ry) * Math.pow(denominator, 2);
      var a = 4 * A * C - B * B;
      var b1 = 4 * A * E - 2 * B * D;
      var c1 = 4 * A * F - D * D;
      var d1 = b1 * b1 - 4 * a * c1;
      var b2 = 4 * C * D - 2 * B * E;
      var c2 = 4 * C * F - E * E;
      var d2 = b2 * b2 - 4 * a * c2;
      var tb1 = (0 - b1 + Math.sqrt(d1)) / (2 * a);
      var tb2 = (0 - b1 - Math.sqrt(d1)) / (2 * a);
      var lr1 = (0 - b2 + Math.sqrt(d2)) / (2 * a);
      var lr2 = (0 - b2 - Math.sqrt(d2)) / (2 * a);
      return {
        left: Math.min(lr1, lr2),
        top: Math.min(tb1, tb2),
        right: Math.max(lr1, lr2),
        bottom: Math.max(tb1, tb2),
        _wh: function () {
          delete this._wh;
          this.width = this.right - this.left;
          this.height = this.bottom - this.top;
          return this;
        }
      }._wh();
    } else return helper.boundingUnderTransform(matrix, t, r, b, l);
  }

  return {
    left: l,
    top: t,
    right: r,
    bottom: b,
    width: 2 * rx,
    height: 2 * ry
  };
}
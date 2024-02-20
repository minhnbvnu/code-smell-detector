function scaleCoords(string, sx, sy) {
    var f = [sx, sy];
    return string.split(' ').map(function (a) {
      return a.split(',').map(function (b, i) {
        return Math.round(b * f[i]);
      }).join(',');
    }).join(' ');
  }
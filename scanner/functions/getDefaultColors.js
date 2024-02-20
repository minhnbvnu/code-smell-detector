function getDefaultColors() {
  var colors = {
    0: '#000',
    1: '#A00',
    2: '#0A0',
    3: '#A50',
    4: '#00A',
    5: '#A0A',
    6: '#0AA',
    7: '#AAA',
    8: '#555',
    9: '#F55',
    10: '#5F5',
    11: '#FF5',
    12: '#55F',
    13: '#F5F',
    14: '#5FF',
    15: '#FFF'
  };
  range(0, 5).forEach(function (red) {
    range(0, 5).forEach(function (green) {
      range(0, 5).forEach(function (blue) {
        return setStyleColor(red, green, blue, colors);
      });
    });
  });
  range(0, 23).forEach(function (gray) {
    var c = gray + 232;
    var l = toHexString(gray * 10 + 8);
    colors[c] = '#' + l + l + l;
  });
  return colors;
}
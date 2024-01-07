function acceptParams (str) {
  var parts = str.split(/ *; */);
  var ret = { value: parts[0], quality: 1, params: {} }

  for (var i = 1; i < parts.length; ++i) {
    var pms = parts[i].split(/ *= */);
    if ('q' === pms[0]) {
      ret.quality = parseFloat(pms[1]);
    } else {
      ret.params[pms[0]] = pms[1];
    }
  }

  return ret;
}
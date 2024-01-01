function parse (value, defaultVec) {
  var coordinate;
  var defaultVal;
  var key;
  var i;
  var vec;
  var x;
  var y;
  var z;
  var w;

  if (value && value instanceof Object) {
    x = value.x === undefined ? defaultVec && defaultVec.x : value.x;
    y = value.y === undefined ? defaultVec && defaultVec.y : value.y;
    z = value.z === undefined ? defaultVec && defaultVec.z : value.z;
    w = value.w === undefined ? defaultVec && defaultVec.w : value.w;
    if (x !== undefined && x !== null) { value.x = parseIfString(x); }
    if (y !== undefined && y !== null) { value.y = parseIfString(y); }
    if (z !== undefined && z !== null) { value.z = parseIfString(z); }
    if (w !== undefined && w !== null) { value.w = parseIfString(w); }
    return value;
  }

  if (value === null || value === undefined) {
    return typeof defaultVec === 'object' ?   extend({}, defaultVec) : defaultVec;
  }

  coordinate = value.trim().split(whitespaceRegex);
  vec = {};
  for (i = 0; i < COORDINATE_KEYS.length; i++) {
    key = COORDINATE_KEYS[i];
    if (coordinate[i]) {
      vec[key] = parseFloat(coordinate[i], 10);
    } else {
      defaultVal = defaultVec && defaultVec[key];
      if (defaultVal === undefined) { continue; }
      vec[key] = parseIfString(defaultVal);
    }
  }
  return vec;
}
function _findKey(result, wantedKey) {
  var val = null;
  Object.keys(result).every(function(key) {

  if (key === wantedKey) {
    val = result[key];
    return false;
  }

  if (typeof result[key] === 'object') {
    val = _findKey(result[key], wantedKey);

    return val === null ? true : false;
  }

  return true;
  });

  return val;
}
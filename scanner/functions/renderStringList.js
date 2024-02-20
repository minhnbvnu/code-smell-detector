function renderStringList (
  val,
  render
) {
  var ret = '';
  var i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    for (i = 0, l = val.length; i < l; i++) {
      ret += render(val[i], i);
    }
  } else if (typeof val === 'number') {
    for (i = 0; i < val; i++) {
      ret += render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret += render(val[key], key, i);
    }
  }
  return ret
}
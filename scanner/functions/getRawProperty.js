function getRawProperty (el, path) {
  var i;
  var split;
  var value;
  split = splitDot(path);
  value = el;
  for (i = 0; i < split.length; i++) {
    value = value[split[i]];
  }
  if (value === undefined) {
    console.log(el);
    throw new Error('[animation] property (' + path + ') could not be found');
  }
  return value;
}
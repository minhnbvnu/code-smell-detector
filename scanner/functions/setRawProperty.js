function setRawProperty (el, path, value, type) {
  var i;
  var split;
  var propertyName;
  var targetValue;

  if (path.startsWith('object3D.rotation')) {
    value = THREE.MathUtils.degToRad(value);
  }

  // Walk.
  split = splitDot(path);
  targetValue = el;
  for (i = 0; i < split.length - 1; i++) { targetValue = targetValue[split[i]]; }
  propertyName = split[split.length - 1];

  // Raw color.
  if (type === TYPE_COLOR) {
    if ('r' in targetValue[propertyName]) {
      targetValue[propertyName].r = value.r;
      targetValue[propertyName].g = value.g;
      targetValue[propertyName].b = value.b;
    } else {
      targetValue[propertyName].x = value.r;
      targetValue[propertyName].y = value.g;
      targetValue[propertyName].z = value.b;
    }
    return;
  }

  targetValue[propertyName] = value;
}
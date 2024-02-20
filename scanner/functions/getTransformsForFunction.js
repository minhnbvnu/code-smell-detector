function getTransformsForFunction(transformsForFile, node, state, pragmas,
    params) {
  var transforms = [];
  transformsForFile.forEach(function(transform) {
    if (transform.shouldTransformFunction(node, state, pragmas, params)) {
      transforms.push(transform);
    }
  });
  return transforms;
}
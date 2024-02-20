function getTransformsForFile(state, pragmas) {
  var transforms = [];
  var nameToTransforms = getNameToTransforms();
  Object.keys(nameToTransforms).forEach(function(value) {
    var transform = nameToTransforms[value];
    if (transform.shouldTransformFile(state, pragmas)) {
      transforms.push(transform);
    }
  });
  return transforms;
}
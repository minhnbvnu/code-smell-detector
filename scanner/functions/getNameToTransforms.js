function getNameToTransforms() {
  var filtered = {};
  Object.keys(nameToTransforms).forEach(function(name) {
    if (excludes.indexOf(name) == -1) {
      filtered[name] = nameToTransforms[name];
    }
  });
  return filtered;
}
function isMultiPassGeometry(primitives) {

  if (primitives.length < 2) return false;

  var primitive0 = primitives[0];
  var targets0 = primitive0.targets || [];

  if (primitive0.indices === undefined) return false;

  for (var i = 1, il = primitives.length; i < il; i++) {

    var primitive = primitives[i];

    if (primitive0.mode !== primitive.mode) return false;
    if (primitive.indices === undefined) return false;
    if (primitive.extensions && primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]) return false;
    if (!isObjectEqual(primitive0.attributes, primitive.attributes)) return false;

    var targets = primitive.targets || [];

    if (targets0.length !== targets.length) return false;

    for (var j = 0, jl = targets0.length; j < jl; j++) {

      if (!isObjectEqual(targets0[j], targets[j])) return false;

    }

  }

  return true;

}
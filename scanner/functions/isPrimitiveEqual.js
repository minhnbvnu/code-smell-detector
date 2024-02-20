function isPrimitiveEqual(a, b) {

  var dracoExtA = a.extensions ? a.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION] : undefined;
  var dracoExtB = b.extensions ? b.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION] : undefined;

  if (dracoExtA && dracoExtB) {

    if (dracoExtA.bufferView !== dracoExtB.bufferView) return false;

    return isObjectEqual(dracoExtA.attributes, dracoExtB.attributes);

  }

  if (a.indices !== b.indices) {

    return false;

  }

  return isObjectEqual(a.attributes, b.attributes);

}
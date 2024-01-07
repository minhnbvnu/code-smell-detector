function addCoordinateTransforms(source, destination, forward, inverse) {
  const sourceProj = get(source);
  const destProj = get(destination);
  addTransformFunc(
    sourceProj,
    destProj,
    createTransformFromCoordinateTransform(forward),
  );
  addTransformFunc(
    destProj,
    sourceProj,
    createTransformFromCoordinateTransform(inverse),
  );
}
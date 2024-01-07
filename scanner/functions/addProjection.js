function addProjection(projection) {
  addProj(projection.getCode(), projection);
  addTransformFunc(projection, projection, cloneTransform);
}
function addEquivalentTransforms(
  projections1,
  projections2,
  forwardTransform,
  inverseTransform,
) {
  projections1.forEach(function (projection1) {
    projections2.forEach(function (projection2) {
      addTransformFunc(projection1, projection2, forwardTransform);
      addTransformFunc(projection2, projection1, inverseTransform);
    });
  });
}
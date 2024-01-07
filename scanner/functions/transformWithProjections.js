function transformWithProjections(
  point,
  sourceProjection,
  destinationProjection,
) {
  const transformFunc = getTransformFromProjections(
    sourceProjection,
    destinationProjection,
  );
  return transformFunc(point);
}
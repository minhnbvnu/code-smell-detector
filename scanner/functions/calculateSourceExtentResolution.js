function calculateSourceExtentResolution(
  sourceProj,
  targetProj,
  targetExtent,
  targetResolution,
) {
  const targetCenter = getCenter(targetExtent);
  let sourceResolution = calculateSourceResolution(
    sourceProj,
    targetProj,
    targetCenter,
    targetResolution,
  );

  if (!isFinite(sourceResolution) || sourceResolution <= 0) {
    forEachCorner(targetExtent, function (corner) {
      sourceResolution = calculateSourceResolution(
        sourceProj,
        targetProj,
        corner,
        targetResolution,
      );
      return isFinite(sourceResolution) && sourceResolution > 0;
    });
  }

  return sourceResolution;
}
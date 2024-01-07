function generatePointRenderInstructions(
  batch,
  renderInstructions,
  customAttributes,
  transform,
) {
  // here we anticipate the amount of render instructions for points:
  // 2 instructions per vertex for position (x and y)
  // + 1 instruction per vertex per custom attributes
  const totalInstructionsCount =
    (2 + getCustomAttributesSize(customAttributes)) * batch.geometriesCount;
  if (
    !renderInstructions ||
    renderInstructions.length !== totalInstructionsCount
  ) {
    renderInstructions = new Float32Array(totalInstructionsCount);
  }

  // loop on features to fill the render instructions
  const tmpCoords = [];
  let renderIndex = 0;
  for (const featureUid in batch.entries) {
    const batchEntry = batch.entries[featureUid];
    for (let i = 0, ii = batchEntry.flatCoordss.length; i < ii; i++) {
      tmpCoords[0] = batchEntry.flatCoordss[i][0];
      tmpCoords[1] = batchEntry.flatCoordss[i][1];
      applyTransform(transform, tmpCoords);

      renderInstructions[renderIndex++] = tmpCoords[0];
      renderInstructions[renderIndex++] = tmpCoords[1];
      renderIndex += pushCustomAttributesInRenderInstructions(
        renderInstructions,
        customAttributes,
        batchEntry,
        renderIndex,
      );
    }
  }
  return renderInstructions;
}
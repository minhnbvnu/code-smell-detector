function generatePolygonRenderInstructions(
  batch,
  renderInstructions,
  customAttributes,
  transform,
) {
  // here we anticipate the amount of render instructions for polygons:
  // 2 instructions per vertex for position (x and y)
  // + 1 instruction per polygon per custom attributes
  // + 1 instruction per polygon (for vertices count in polygon)
  // + 1 instruction per ring (for vertices count in ring)
  const totalInstructionsCount =
    2 * batch.verticesCount +
    (1 + getCustomAttributesSize(customAttributes)) * batch.geometriesCount +
    batch.ringsCount;
  if (
    !renderInstructions ||
    renderInstructions.length !== totalInstructionsCount
  ) {
    renderInstructions = new Float32Array(totalInstructionsCount);
  }

  // loop on features to fill the render instructions
  const flatCoords = [];
  let renderIndex = 0;
  for (const featureUid in batch.entries) {
    const batchEntry = batch.entries[featureUid];
    for (let i = 0, ii = batchEntry.flatCoordss.length; i < ii; i++) {
      flatCoords.length = batchEntry.flatCoordss[i].length;
      transform2D(
        batchEntry.flatCoordss[i],
        0,
        flatCoords.length,
        2,
        transform,
        flatCoords,
      );
      renderIndex += pushCustomAttributesInRenderInstructions(
        renderInstructions,
        customAttributes,
        batchEntry,
        renderIndex,
      );

      // ring count
      renderInstructions[renderIndex++] =
        batchEntry.ringsVerticesCounts[i].length;

      // vertices count in each ring
      for (
        let j = 0, jj = batchEntry.ringsVerticesCounts[i].length;
        j < jj;
        j++
      ) {
        renderInstructions[renderIndex++] =
          batchEntry.ringsVerticesCounts[i][j];
      }

      // looping on points for positions
      for (let j = 0, jj = flatCoords.length; j < jj; j += 2) {
        renderInstructions[renderIndex++] = flatCoords[j];
        renderInstructions[renderIndex++] = flatCoords[j + 1];
      }
    }
  }
  return renderInstructions;
}
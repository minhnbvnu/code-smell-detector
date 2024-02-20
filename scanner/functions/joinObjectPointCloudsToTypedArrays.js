function joinObjectPointCloudsToTypedArrays(objects) {
  if (objects.length === 0) {
    return null;
  }

  let numInstances = 0;
  for (const object of objects) {
    numInstances += getVertexCount(object.vertices);
  }

  let vertexColorStride = null;

  const positions = new Float32Array(numInstances * 3);
  const colors = new Uint8ClampedArray(numInstances * 4);

  // Store object ids to enable recoloring.
  // NOTE: Not a vertex attribute, ids are just efficiently stored as as 32 bit integers...
  const ids = new Uint32Array(numInstances);

  let i = 0;
  objects.forEach(object => {
    const vertexPositions = object.vertices;
    // object.color is V1 and should be removed when deprecated
    const vertexColors = object.colors;
    const vertexCount = getVertexCount(vertexPositions);

    if (vertexCount === 0) {
      return;
    }

    // Setup for per-point color
    const colorStride = getColorStride(vertexColors || object.color, vertexCount);
    if (vertexColorStride !== null && vertexColorStride !== colorStride) {
      log.error('Inconsistent point color format');
    }
    vertexColorStride = colorStride;

    const isColorFlattenedArray =
      vertexColors && vertexColors.length === vertexCount * vertexColorStride;
    if (isColorFlattenedArray) {
      colors.set(vertexColors, i * vertexColorStride);
    }

    const isPositionFlattenedArray = vertexPositions.length === vertexCount * 3;
    if (isPositionFlattenedArray) {
      positions.set(vertexPositions, i * 3);
    }

    if (Number.isFinite(object.id)) {
      // v1 object ids
      ids.fill(object.id, i, i + vertexCount);
    }

    if (isPositionFlattenedArray && (isColorFlattenedArray || !vertexColorStride)) {
      // both positions and colors are populated
      return;
    }

    let color = object.color || DEFAULT_COLOR;
    for (let j = 0; j < vertexCount; j++, i++) {
      if (!isPositionFlattenedArray) {
        const vertex = vertexPositions[j];
        positions[i * 3 + 0] = vertex[0];
        positions[i * 3 + 1] = vertex[1];
        positions[i * 3 + 2] = vertex[2];
      }

      if (!isColorFlattenedArray && vertexColorStride) {
        if (vertexColors) {
          color = vertexColors[j];
        }
        colors[i * vertexColorStride + 0] = color[0];
        colors[i * vertexColorStride + 1] = color[1];
        colors[i * vertexColorStride + 2] = color[2];
        if (vertexColorStride === 4) {
          colors[i * vertexColorStride + 3] = color[3] || 255;
        }
      }
    }
  });

  return {
    type: objects[0].type,
    numInstances,
    positions,
    colors: vertexColorStride ? colors.subarray(0, vertexColorStride * numInstances) : null,
    ids
  };
}
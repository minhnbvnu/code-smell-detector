function writePointFeatureToBuffers(
  instructions,
  elementIndex,
  vertexBuffer,
  indexBuffer,
  customAttributesSize,
  bufferPositions,
) {
  // This is for x, y and index
  const baseVertexAttrsCount = 3;
  const baseInstructionsCount = 2;
  const stride = baseVertexAttrsCount + customAttributesSize;

  const x = instructions[elementIndex + 0];
  const y = instructions[elementIndex + 1];

  // read custom numerical attributes on the feature
  const customAttrs = tmpArray_;
  customAttrs.length = customAttributesSize;
  for (let i = 0; i < customAttrs.length; i++) {
    customAttrs[i] = instructions[elementIndex + baseInstructionsCount + i];
  }

  let vPos = bufferPositions ? bufferPositions.vertexPosition : 0;
  let iPos = bufferPositions ? bufferPositions.indexPosition : 0;
  const baseIndex = vPos / stride;

  // push vertices for each of the four quad corners (first standard then custom attributes)
  writePointVertex(vertexBuffer, vPos, x, y, 0);
  customAttrs.length &&
    vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
  vPos += stride;

  writePointVertex(vertexBuffer, vPos, x, y, 1);
  customAttrs.length &&
    vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
  vPos += stride;

  writePointVertex(vertexBuffer, vPos, x, y, 2);
  customAttrs.length &&
    vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
  vPos += stride;

  writePointVertex(vertexBuffer, vPos, x, y, 3);
  customAttrs.length &&
    vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
  vPos += stride;

  indexBuffer[iPos++] = baseIndex;
  indexBuffer[iPos++] = baseIndex + 1;
  indexBuffer[iPos++] = baseIndex + 3;
  indexBuffer[iPos++] = baseIndex + 1;
  indexBuffer[iPos++] = baseIndex + 2;
  indexBuffer[iPos++] = baseIndex + 3;

  bufferPositions_.vertexPosition = vPos;
  bufferPositions_.indexPosition = iPos;

  return bufferPositions_;
}
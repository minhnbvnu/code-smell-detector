function calculateIndices({uCount, vCount}) {
  // # of squares = (nx - 1) * (ny - 1)
  // # of triangles = squares * 2
  // # of indices = triangles * 3
  const indicesCount = uCount * vCount * 2 * 3;
  const indices = new Uint32Array(indicesCount);

  let i = 0;
  for (let uIndex = 0; uIndex < uCount; uIndex++) {
    for (let vIndex = 0; vIndex < vCount; vIndex++) {
      /*
       *   i0   i1
       *    +--.+---
       *    | / |
       *    +'--+---
       *    |   |
       *   i2   i3
       */
      const i0 = vIndex * (uCount + 1) + uIndex;
      const i1 = i0 + 1;
      const i2 = i0 + uCount + 1;
      const i3 = i2 + 1;

      indices[i++] = i0;
      indices[i++] = i2;
      indices[i++] = i1;
      indices[i++] = i1;
      indices[i++] = i2;
      indices[i++] = i3;
    }
  }

  return indices;
}
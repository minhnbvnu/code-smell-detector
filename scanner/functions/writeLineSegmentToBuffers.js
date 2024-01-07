function writeLineSegmentToBuffers(
  instructions,
  segmentStartIndex,
  segmentEndIndex,
  beforeSegmentIndex,
  afterSegmentIndex,
  vertexArray,
  indexArray,
  customAttributes,
  toWorldTransform,
  currentLength,
  currentAngleTangentSum,
) {
  // compute the stride to determine how many vertices were already pushed
  const baseVertexAttrsCount = 8; // base attributes: x0, y0, x1, y1, angle0, angle1, distance, params
  const stride = baseVertexAttrsCount + customAttributes.length;
  const baseIndex = vertexArray.length / stride;

  // The segment is composed of two positions called P0[x0, y0] and P1[x1, y1]
  // Depending on whether there are points before and after the segment, its final shape
  // will be different
  const p0 = [
    instructions[segmentStartIndex + 0],
    instructions[segmentStartIndex + 1],
  ];
  const p1 = [instructions[segmentEndIndex], instructions[segmentEndIndex + 1]];

  // to compute join angles we need to reproject coordinates back in world units
  const p0world = applyTransform(toWorldTransform, [...p0]);
  const p1world = applyTransform(toWorldTransform, [...p1]);

  /**
   * Compute the angle between p0pA and p0pB
   * @param {import("../../coordinate.js").Coordinate} p0 Point 0
   * @param {import("../../coordinate.js").Coordinate} pA Point A
   * @param {import("../../coordinate.js").Coordinate} pB Point B
   * @return {number} a value in [0, 2PI]
   */
  function angleBetween(p0, pA, pB) {
    const lenA = Math.sqrt(
      (pA[0] - p0[0]) * (pA[0] - p0[0]) + (pA[1] - p0[1]) * (pA[1] - p0[1]),
    );
    const tangentA = [(pA[0] - p0[0]) / lenA, (pA[1] - p0[1]) / lenA];
    const orthoA = [-tangentA[1], tangentA[0]];
    const lenB = Math.sqrt(
      (pB[0] - p0[0]) * (pB[0] - p0[0]) + (pB[1] - p0[1]) * (pB[1] - p0[1]),
    );
    const tangentB = [(pB[0] - p0[0]) / lenB, (pB[1] - p0[1]) / lenB];

    // this angle can be clockwise or anticlockwise; hence the computation afterwards
    const angle =
      lenA === 0 || lenB === 0
        ? 0
        : Math.acos(
            clamp(tangentB[0] * tangentA[0] + tangentB[1] * tangentA[1], -1, 1),
          );
    const isClockwise = tangentB[0] * orthoA[0] + tangentB[1] * orthoA[1] > 0;
    return !isClockwise ? Math.PI * 2 - angle : angle;
  }

  // a negative angle indicates a line cap
  let angle0 = -1;
  let angle1 = -1;
  let newAngleTangentSum = currentAngleTangentSum;

  const joinBefore = beforeSegmentIndex !== null;
  const joinAfter = afterSegmentIndex !== null;

  // add vertices and adapt offsets for P0 in case of join
  if (joinBefore) {
    // B for before
    const pB = [
      instructions[beforeSegmentIndex],
      instructions[beforeSegmentIndex + 1],
    ];
    const pBworld = applyTransform(toWorldTransform, [...pB]);
    angle0 = angleBetween(p0world, p1world, pBworld);

    // only add to the sum if the angle isn't too close to 0 or 2PI
    if (Math.cos(angle0) <= LINESTRING_ANGLE_COSINE_CUTOFF) {
      newAngleTangentSum += Math.tan((angle0 - Math.PI) / 2);
    }
  }
  // adapt offsets for P1 in case of join; add to angle sum
  if (joinAfter) {
    // A for after
    const pA = [
      instructions[afterSegmentIndex],
      instructions[afterSegmentIndex + 1],
    ];
    const pAworld = applyTransform(toWorldTransform, [...pA]);
    angle1 = angleBetween(p1world, p0world, pAworld);

    // only add to the sum if the angle isn't too close to 0 or 2PI
    if (Math.cos(angle1) <= LINESTRING_ANGLE_COSINE_CUTOFF) {
      newAngleTangentSum += Math.tan((Math.PI - angle1) / 2);
    }
  }

  /**
   * @param {number} vertexIndex From 0 to 3, indicating position in the quad
   * @param {number} angleSum Sum of the join angles encountered so far (used to compute distance offset
   * @return {number} A float value containing both information
   */
  function computeParameters(vertexIndex, angleSum) {
    if (angleSum === 0) {
      return vertexIndex * 10000;
    }
    return Math.sign(angleSum) * (vertexIndex * 10000 + Math.abs(angleSum));
  }

  // add main segment triangles
  vertexArray.push(
    p0[0],
    p0[1],
    p1[0],
    p1[1],
    angle0,
    angle1,
    currentLength,
    computeParameters(0, currentAngleTangentSum),
  );
  vertexArray.push(...customAttributes);

  vertexArray.push(
    p0[0],
    p0[1],
    p1[0],
    p1[1],
    angle0,
    angle1,
    currentLength,
    computeParameters(1, currentAngleTangentSum),
  );
  vertexArray.push(...customAttributes);

  vertexArray.push(
    p0[0],
    p0[1],
    p1[0],
    p1[1],
    angle0,
    angle1,
    currentLength,
    computeParameters(2, currentAngleTangentSum),
  );
  vertexArray.push(...customAttributes);

  vertexArray.push(
    p0[0],
    p0[1],
    p1[0],
    p1[1],
    angle0,
    angle1,
    currentLength,
    computeParameters(3, currentAngleTangentSum),
  );
  vertexArray.push(...customAttributes);

  indexArray.push(
    baseIndex,
    baseIndex + 1,
    baseIndex + 2,
    baseIndex + 1,
    baseIndex + 3,
    baseIndex + 2,
  );

  return {
    length:
      currentLength +
      Math.sqrt(
        (p1world[0] - p0world[0]) * (p1world[0] - p0world[0]) +
          (p1world[1] - p0world[1]) * (p1world[1] - p0world[1]),
      ),
    angle: newAngleTangentSum,
  };
}
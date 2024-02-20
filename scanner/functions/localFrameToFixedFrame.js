function localFrameToFixedFrame(ellipsoid, firstAxis, secondAxis, thirdAxis, cartesianOrigin, result) {
    const thirdAxisInferred = VECTOR_PRODUCT_LOCAL_FRAME[firstAxis] && VECTOR_PRODUCT_LOCAL_FRAME[firstAxis][secondAxis];
    assert4(thirdAxisInferred && (!thirdAxis || thirdAxis === thirdAxisInferred));
    let firstAxisVector;
    let secondAxisVector;
    let thirdAxisVector;
    const origin = scratchOrigin.copy(cartesianOrigin);
    const atPole = equals(origin.x, 0, EPSILON14) && equals(origin.y, 0, EPSILON14);
    if (atPole) {
      const sign = Math.sign(origin.z);
      firstAxisVector = scratchVector1.fromArray(degeneratePositionLocalFrame[firstAxis]);
      if (firstAxis !== "east" && firstAxis !== "west") {
        firstAxisVector.scale(sign);
      }
      secondAxisVector = scratchVector22.fromArray(degeneratePositionLocalFrame[secondAxis]);
      if (secondAxis !== "east" && secondAxis !== "west") {
        secondAxisVector.scale(sign);
      }
      thirdAxisVector = scratchVector3.fromArray(degeneratePositionLocalFrame[thirdAxis]);
      if (thirdAxis !== "east" && thirdAxis !== "west") {
        thirdAxisVector.scale(sign);
      }
    } else {
      const {
        up,
        east,
        north
      } = scratchAxisVectors;
      east.set(-origin.y, origin.x, 0).normalize();
      ellipsoid.geodeticSurfaceNormal(origin, up);
      north.copy(up).cross(east);
      const {
        down,
        west,
        south
      } = scratchAxisVectors;
      down.copy(up).scale(-1);
      west.copy(east).scale(-1);
      south.copy(north).scale(-1);
      firstAxisVector = scratchAxisVectors[firstAxis];
      secondAxisVector = scratchAxisVectors[secondAxis];
      thirdAxisVector = scratchAxisVectors[thirdAxis];
    }
    result[0] = firstAxisVector.x;
    result[1] = firstAxisVector.y;
    result[2] = firstAxisVector.z;
    result[3] = 0;
    result[4] = secondAxisVector.x;
    result[5] = secondAxisVector.y;
    result[6] = secondAxisVector.z;
    result[7] = 0;
    result[8] = thirdAxisVector.x;
    result[9] = thirdAxisVector.y;
    result[10] = thirdAxisVector.z;
    result[11] = 0;
    result[12] = origin.x;
    result[13] = origin.y;
    result[14] = origin.z;
    result[15] = 1;
    return result;
  }
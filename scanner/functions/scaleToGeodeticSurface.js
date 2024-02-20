function scaleToGeodeticSurface(cartesian, ellipsoid, result = new Vector3()) {
    const {
      oneOverRadii,
      oneOverRadiiSquared,
      centerToleranceSquared
    } = ellipsoid;
    scratchVector2.from(cartesian);
    const positionX = cartesian.x;
    const positionY = cartesian.y;
    const positionZ = cartesian.z;
    const oneOverRadiiX = oneOverRadii.x;
    const oneOverRadiiY = oneOverRadii.y;
    const oneOverRadiiZ = oneOverRadii.z;
    const x2 = positionX * positionX * oneOverRadiiX * oneOverRadiiX;
    const y2 = positionY * positionY * oneOverRadiiY * oneOverRadiiY;
    const z2 = positionZ * positionZ * oneOverRadiiZ * oneOverRadiiZ;
    const squaredNorm = x2 + y2 + z2;
    const ratio = Math.sqrt(1 / squaredNorm);
    if (!Number.isFinite(ratio)) {
      return void 0;
    }
    const intersection = scaleToGeodeticSurfaceIntersection;
    intersection.copy(cartesian).scale(ratio);
    if (squaredNorm < centerToleranceSquared) {
      return intersection.to(result);
    }
    const oneOverRadiiSquaredX = oneOverRadiiSquared.x;
    const oneOverRadiiSquaredY = oneOverRadiiSquared.y;
    const oneOverRadiiSquaredZ = oneOverRadiiSquared.z;
    const gradient = scaleToGeodeticSurfaceGradient;
    gradient.set(intersection.x * oneOverRadiiSquaredX * 2, intersection.y * oneOverRadiiSquaredY * 2, intersection.z * oneOverRadiiSquaredZ * 2);
    let lambda = (1 - ratio) * cartesian.len() / (0.5 * gradient.len());
    let correction = 0;
    let xMultiplier;
    let yMultiplier;
    let zMultiplier;
    let func;
    do {
      lambda -= correction;
      xMultiplier = 1 / (1 + lambda * oneOverRadiiSquaredX);
      yMultiplier = 1 / (1 + lambda * oneOverRadiiSquaredY);
      zMultiplier = 1 / (1 + lambda * oneOverRadiiSquaredZ);
      const xMultiplier2 = xMultiplier * xMultiplier;
      const yMultiplier2 = yMultiplier * yMultiplier;
      const zMultiplier2 = zMultiplier * zMultiplier;
      const xMultiplier3 = xMultiplier2 * xMultiplier;
      const yMultiplier3 = yMultiplier2 * yMultiplier;
      const zMultiplier3 = zMultiplier2 * zMultiplier;
      func = x2 * xMultiplier2 + y2 * yMultiplier2 + z2 * zMultiplier2 - 1;
      const denominator = x2 * xMultiplier3 * oneOverRadiiSquaredX + y2 * yMultiplier3 * oneOverRadiiSquaredY + z2 * zMultiplier3 * oneOverRadiiSquaredZ;
      const derivative = -2 * denominator;
      correction = func / derivative;
    } while (Math.abs(func) > math_utils_default.EPSILON12);
    return scratchVector2.scale([xMultiplier, yMultiplier, zMultiplier]).to(result);
  }
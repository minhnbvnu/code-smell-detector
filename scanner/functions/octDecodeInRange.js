function octDecodeInRange(x, y, rangeMax, result) {
    assert8(result);
    if (x < 0 || x > rangeMax || y < 0 || y > rangeMax) {
      throw new Error(`x and y must be unsigned normalized integers between 0 and ${rangeMax}`);
    }
    result.x = fromSNorm(x, rangeMax);
    result.y = fromSNorm(y, rangeMax);
    result.z = 1 - (Math.abs(result.x) + Math.abs(result.y));
    if (result.z < 0) {
      const oldVX = result.x;
      result.x = (1 - Math.abs(result.y)) * signNotZero(oldVX);
      result.y = (1 - Math.abs(oldVX)) * signNotZero(result.y);
    }
    return result.normalize();
  }
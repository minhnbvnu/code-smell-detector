function fromCartographic(cartographic, result, map3 = noop) {
    if (isArray(cartographic)) {
      result[0] = map3(cartographic[0]);
      result[1] = map3(cartographic[1]);
      result[2] = cartographic[2];
    } else if ("longitude" in cartographic) {
      result[0] = map3(cartographic.longitude);
      result[1] = map3(cartographic.latitude);
      result[2] = cartographic.height;
    } else {
      result[0] = map3(cartographic.x);
      result[1] = map3(cartographic.y);
      result[2] = cartographic.z;
    }
    return result;
  }
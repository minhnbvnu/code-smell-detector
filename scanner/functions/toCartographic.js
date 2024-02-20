function toCartographic(vector, cartographic, map3 = noop) {
    if (isArray(cartographic)) {
      cartographic[0] = map3(vector[0]);
      cartographic[1] = map3(vector[1]);
      cartographic[2] = vector[2];
    } else if ("longitude" in cartographic) {
      cartographic.longitude = map3(vector[0]);
      cartographic.latitude = map3(vector[1]);
      cartographic.height = vector[2];
    } else {
      cartographic.x = map3(vector[0]);
      cartographic.y = map3(vector[1]);
      cartographic.z = vector[2];
    }
    return cartographic;
  }
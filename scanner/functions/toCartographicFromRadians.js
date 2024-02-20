function toCartographicFromRadians(vector, cartographic) {
    return toCartographic(vector, cartographic, config._cartographicRadians ? noop : toDegrees);
  }
function positionToLngLat([x, y, z], {coordinateSystem, coordinateOrigin, modelMatrix}) {
  if (modelMatrix) {
    [x, y, z] = new Matrix4(modelMatrix).transformAsPoint([x, y, z]);
  }

  switch (coordinateSystem) {
    case COORDINATE_SYSTEM.METER_OFFSETS:
      return addMetersToLngLat(coordinateOrigin, [x, y, z]);

    case COORDINATE_SYSTEM.LNGLAT:
    default:
      return [x, y, z];
  }
}
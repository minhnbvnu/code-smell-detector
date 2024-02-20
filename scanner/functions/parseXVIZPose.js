function parseXVIZPose(pose) {
  // TODO(twojtasz): remove deprecated mapOrigin
  //                 https://github.com/uber/xviz/issues/394
  const {mapOrigin, map_origin, position, orientation, timestamp} = pose;
  const origin = map_origin || mapOrigin;

  const result = {
    timestamp
  };

  if (origin) {
    const {longitude, latitude, altitude} = origin;
    Object.assign(result, {
      longitude,
      latitude,
      altitude
    });
  }

  if (position) {
    const [x, y, z] = position;
    Object.assign(result, {
      x,
      y,
      z
    });
  }

  if (orientation) {
    const [roll, pitch, yaw] = orientation;
    Object.assign(result, {
      roll,
      pitch,
      yaw
    });
  }

  if (getXVIZConfig().DYNAMIC_STREAM_METADATA) {
    result.__metadata = {
      category: 'POSE'
    };
  }

  return {...pose, ...result};
}
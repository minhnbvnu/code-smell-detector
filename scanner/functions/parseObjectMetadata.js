function parseObjectMetadata(object, instances) {
  const {translation, rotation, size} = object;
  const {roll, pitch, yaw} = quaternionToEulerAngle(...rotation);
  const instance = instances[object.instance_token];

  const category = instance.category;
  const bounds = [
    [-size[1] / 2, -size[0] / 2, 0],
    [-size[1] / 2, size[0] / 2, 0],
    [size[1] / 2, size[0] / 2, 0],
    [size[1] / 2, -size[0] / 2, 0],
    [-size[1] / 2, -size[0] / 2, 0]
  ];

  const poseProps = {
    x: translation[0],
    y: translation[1],
    z: translation[2],
    roll,
    pitch,
    yaw
  };

  return {
    ...object,
    ...poseProps,
    category,
    bounds,
    vertices: getRelativeCoordinates(bounds, poseProps)
  };
}
function getGeospatialToPoseTransform(from, to) {
  // Since 'to' is the target, get the vector from 'to -> from'
  // and use that to set the position of 'from Pose'

  // offset in world coordinate system
  let offset = getGeospatialVector(from, to);

  const fromPose = new Pose({
    x: 0,
    y: 0,
    z: 0,
    pitch: from.pitch,
    roll: from.roll,
    yaw: from.yaw
  });

  // transform offset to `fromPose` coordinate
  // TODO figure out why this step is needed
  const worldToFromPoseTransformMatrix = fromPose.getTransformationMatrix().invert();
  offset = worldToFromPoseTransformMatrix.transform(offset);

  const toPose = new Pose({
    x: offset[0],
    y: offset[1],
    z: offset[2],
    pitch: to.pitch,
    roll: to.roll,
    yaw: to.yaw
  });

  // there is a bug in math.gl https://github.com/uber-web/math.gl/issues/33
  // pose.getTransformationMatrixFromPose and pose.getTransformationMatrixFromPose are flipped
  return fromPose.getTransformationMatrixFromPose(toPose);
}
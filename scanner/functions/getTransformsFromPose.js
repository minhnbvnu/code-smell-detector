function getTransformsFromPose(vehiclePose) {
  const {longitude, latitude, altitude = 0} = vehiclePose;

  const origin =
    Number.isFinite(vehiclePose.longitude) && Number.isFinite(vehiclePose.latitude)
      ? [longitude, latitude, altitude]
      : null;
  const pose = new Pose(vehiclePose);

  const vehicleRelativeTransform = pose.getTransformationMatrix();

  // If map_origin is not specified, use a faux position of [0, 0, 0]
  // deck.gl needs a lon/lat position to target the camera
  const trackPosition = addMetersToLngLat(
    origin || [0, 0, 0],
    vehicleRelativeTransform.transform([0, 0, 0])
  );

  return {
    origin,
    vehicleRelativeTransform,
    trackPosition,
    heading: (pose.yaw / Math.PI) * 180
  };
}
function setupPose(builder) {
  const {longitude, latitude, altitude} = DEFAULT_POSE.map_origin;
  builder
    .pose(PRIMARY_POSE_STREAM)
    .timestamp(DEFAULT_POSE.timestamp)
    .mapOrigin(longitude, latitude, altitude)
    .position(...DEFAULT_POSE.position)
    .orientation(...DEFAULT_POSE.orientation);
}
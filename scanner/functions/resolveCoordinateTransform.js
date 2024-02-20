function resolveCoordinateTransform(
  frame,
  streamName,
  streamMetadata = {},
  getTransformMatrix
) {
  const {origin, links, poses, streams, transforms = {}, vehicleRelativeTransform} = frame;
  const {coordinate, transform, pose} = streamMetadata;

  let coordinateSystem = COORDINATE_SYSTEM.METER_OFFSETS;
  let modelMatrix = null;
  let streamTransform = transform;

  switch (coordinate) {
    case COORDINATE.GEOGRAPHIC:
      coordinateSystem = COORDINATE_SYSTEM.LNGLAT;
      break;

    case COORDINATE.DYNAMIC:
      // TODO(twojtasz): this should work with links and needs streamName passed
      // cache calculated transform matrix for each frame
      transforms[transform] = transforms[transform] || getTransformMatrix(transform, frame);
      modelMatrix = transforms[transform];
      frame.transforms = transforms;
      streamTransform = null;
      break;

    case COORDINATE.VEHICLE_RELATIVE:
      // NOTE: In XVIZ this setting means a relationship to `/vehicle_pose` stream.
      // However, with the addition of *links* this really becomes only a convenience
      // as you could choose arbitrary poses.
      modelMatrix = vehicleRelativeTransform;
      break;

    default:
    case COORDINATE.IDENTITY:
      modelMatrix = resolveLinksTransform(links, poses || streams, streamName);
      break;
  }

  if (pose) {
    // TODO(twojtasz): remove when builder updates
    streamTransform = new Pose(pose).getTransformationMatrix();
  }
  if (streamTransform && streamTransform.length > 0) {
    // TODO(twojtasz): this needs tested with links
    modelMatrix = modelMatrix
      ? new Matrix4(modelMatrix).multiplyRight(streamTransform)
      : streamTransform;
  }

  return {
    coordinateSystem,
    coordinateOrigin: origin || DEFAULT_ORIGIN,
    modelMatrix
  };
}
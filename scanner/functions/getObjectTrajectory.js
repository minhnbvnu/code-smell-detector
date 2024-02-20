function getObjectTrajectory({
  targetObject,
  objectFrames,
  poseFrames,
  startFrame,
  endFrame
}) {
  const vertices = [];
  const startVehiclePose = poseFrames[startFrame].pose;
  const limit = Math.min(endFrame, targetObject.lastFrame);
  const motions = getObjectMotions(targetObject, objectFrames, startFrame, limit);

  for (let i = 0; i < motions.length; i++) {
    const step = motions[i];

    const currVehiclePose = poseFrames[startFrame + i].pose;

    // matrix to convert data from currVehiclePose relative to startVehiclePose relative.
    const transformMatrix = getGeospatialToPoseTransform(currVehiclePose, startVehiclePose);

    // objects in curr frame are meters offset based on currVehiclePose
    // need to convert to the coordinate system of the startVehiclePose
    const p = transformMatrix.transform([step.x, step.y, step.z]);
    vertices.push(p);
  }

  return vertices;
}
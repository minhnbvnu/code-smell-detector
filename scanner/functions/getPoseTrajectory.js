function getPoseTrajectory({poses, startFrame, endFrame}) {
  const positions = [];
  const iterationLimit = Math.min(endFrame, poses.length);

  for (let i = startFrame; i < iterationLimit; i++) {
    positions.push(poses[i].pose);
  }

  const startPose = poses[startFrame].pose;
  const worldToStartPoseTransformMatrix = new Pose(startPose).getTransformationMatrix().invert();

  return positions.map(currPose => {
    // offset vector in world coordinate system
    const offset = getGeospatialVector(startPose, currPose);

    // transform offset to startPose coordinate system
    const relativeOffset = worldToStartPoseTransformMatrix.transform(offset);

    return relativeOffset;
  });
}
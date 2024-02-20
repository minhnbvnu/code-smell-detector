function resolveLinksTransform(links, poses, streamName) {
  const transforms = [];

  // If streamName has a pose entry, ensure we capture it
  if (poses[streamName]) {
    transforms.push(poses[streamName]);
  }

  // TODO(twojtasz): we could cache the resulting transform based on the entry
  // into the link structure.
  let missingPose = '';
  let cycleDetected = false;
  if (links) {
    let parentPoseName = links[streamName] && links[streamName].target_pose;
    const seen = new Set();

    // Collect all poses from child to root
    while (parentPoseName) {
      cycleDetected = seen.has(parentPoseName);
      if (cycleDetected) {
        break;
      }
      seen.add(parentPoseName);

      if (!poses[parentPoseName]) {
        missingPose = parentPoseName;
        break;
      }

      transforms.push(poses[parentPoseName]);
      parentPoseName = links[parentPoseName] && links[parentPoseName].target_pose;
    }
  }

  if (missingPose) {
    // TODO(twojtasz): report issue
    return null;
  }

  if (cycleDetected) {
    // TODO(twojtasz): report issue
    return null;
  }

  if (transforms.length) {
    // process from root to child
    return transforms.reduceRight((acc, val) => {
      return acc.multiplyRight(new Pose(val).getTransformationMatrix());
    }, new Matrix4());
  }

  return null;
}
function parseXVIZLink(link) {
  const {target_pose, ...rest} = link;

  if (!target_pose) {
    throw new Error('Link must define a target_pose');
  }

  return {target_pose, ...rest};
}
function resolveDockerUser({nasConfig, stage = 'run'}) {
  let { userId, groupId } = definition.getUserIdAndGroupId(nasConfig);

  if (process.platform === 'linux') {
    debug('For linux platform, Fun will use host userId and groupId to build or run your functions');
    userId = process.getuid();
    groupId = process.getgid();
  } else {
    if (stage === 'run') {
      if (userId === -1 || userId === undefined) {
        userId = NAS_UID;
      }
      if (groupId === -1 || groupId === undefined) {
        groupId = NAS_GID;
      }
    } else {
      userId = 0;
      groupId = 0;
    }
  }

  return `${userId}:${groupId}`;
}
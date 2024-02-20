async function findPathsOutofSharedPaths(mounts) {
  const dockerSharedPaths = await getSharedPathsOfDockerForMac();
  let pathsOutofSharedPaths = [];
  for (let mount of mounts) {
    if (_.isEmpty(mount)) { continue; }
    
    const mountPath = mount.Source;
    let isMountPathSharedToDocker = false;
    for (let dockerSharedPath of dockerSharedPaths) {
      if (mountPath.startsWith(dockerSharedPath)) {
        isMountPathSharedToDocker = true;
        break;
      }
    }
    if (!isMountPathSharedToDocker) {
      pathsOutofSharedPaths.push(mountPath);
    }
  }
  return pathsOutofSharedPaths;
}
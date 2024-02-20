function generateBuildkitMountsFromDockerMounts(mountsInDocker, baseDir) {
  const mounts = [];
  mountsInDocker.forEach( m => {
    if (m.ReadOnly) {
      mounts.push(`--mount=type=${m.Type},source=${path.relative(baseDir, m.Source)},target=${m.Target}${m.ReadOnly ? '' : ',readwrite'}`);
    }
  });
  return mounts;
}
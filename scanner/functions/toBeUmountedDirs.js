function toBeUmountedDirs(configuredMountDirs, mountedDirs) {

  const toUnmountDirs = mountedDirs.filter((mountedDir) => !configuredMountDirs.includes(mountedDir));

  return toUnmountDirs;
}
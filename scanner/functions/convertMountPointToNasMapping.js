async function convertMountPointToNasMapping(nasBaseDir, mountPoint) {
  const { mountSource, mountDir, serverPath } = resolveMountPoint(mountPoint);

  const nasDir = path.join(nasBaseDir, serverPath);

  if (!(await fs.pathExists(nasDir))) {
    await fs.ensureDir(nasDir);
  }

  const localNasDir = path.join(nasDir, mountSource);

  // The mounted nas directory must exist.
  if (!(await fs.pathExists(localNasDir))) {
    await fs.ensureDir(localNasDir);
  }

  return {
    localNasDir,
    remoteNasDir: mountDir
  };
}
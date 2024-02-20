async function resolveLibPathsFromLdConf(baseDir, codeUri) {
  const envs = {};
  if (!codeUri) { return envs; }
  const confdPath = path.resolve(baseDir, codeUri, '.fun/root/etc/ld.so.conf.d');

  if (! await fs.pathExists(confdPath)) { return envs; }

  const stats = await fs.lstat(confdPath);

  if (stats.isFile()) { return envs; }

  const libPaths = await resolveLibPaths(confdPath);

  if (!_.isEmpty(libPaths)) {

    envs['LD_LIBRARY_PATH'] = libPaths.map(path => `/code/.fun/root${path}`).join(':');
  }
  return envs;
}
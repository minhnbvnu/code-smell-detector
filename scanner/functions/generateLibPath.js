function generateLibPath(envs, prefix) {
  let libPath = _.union(
    sysLibs.map(p => `${prefix}/root${p}`),
    fcLibs
  ).join(':');

  if (envs['LD_LIBRARY_PATH']) {
    libPath = `${envs['LD_LIBRARY_PATH']}:${libPath}`;
  }
  return duplicateRemoval(libPath);
}
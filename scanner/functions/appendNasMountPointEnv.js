function appendNasMountPointEnv(envs, mountDir) {

  envs['LD_LIBRARY_PATH'] = generateLibPath(envs, mountDir);
  envs['PATH'] = generatePath(envs, mountDir);
  envs['NODE_PATH'] = generateNodePaths(envs, mountDir);

  const nasPythonPaths = generatePythonPaths(mountDir);

  if (envs['PYTHONPATH']) {
    envs['PYTHONPATH'] = `${envs['PYTHONPATH']}:${nasPythonPaths}`;
  } else {
    envs['PYTHONPATH'] = nasPythonPaths;
  }

  // TODO: add other runtime envs
  return envs;
}
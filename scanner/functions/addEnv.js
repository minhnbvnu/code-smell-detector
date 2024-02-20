function addEnv(envVars, nasConfig) {
  const envs = Object.assign({}, envVars);

  const prefix = '/code/.fun';

  envs['LD_LIBRARY_PATH'] = generateLibPath(envs, prefix);
  envs['PATH'] = generatePath(envs, prefix);
  envs['NODE_PATH'] = generateNodePaths(envs, '/code');

  const defaultPythonPath = `${prefix}/python`;
  if (!envs['PYTHONUSERBASE']) {
    envs['PYTHONUSERBASE'] = defaultPythonPath;
  }

  if (nasConfig) {
    return appendNasEnvs(envs, nasConfig);
  }

  return envs;
}
function generateNasEnv(defaultEnvValue, remoteNasDir, envKey) {
  const env = {};

  if (!envKey) {
    return env;
  }

  env[envKey] = defaultEnvValue ? `${remoteNasDir}:${defaultEnvValue}` : remoteNasDir;

  return env;
}
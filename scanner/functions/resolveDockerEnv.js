function resolveDockerEnv(envs = {}, isCustomContainer = false) {
  if (isCustomContainer) {
    return _.map(envs || {}, (v, k) => `${k}=${v}`);
  }
  return _.map(addEnv(envs || {}), (v, k) => `${k}=${v}`);
}
function resolveEnv(envs = {}) {
  if (_.isString(envs)) {
    throw new Error('fun.yml env property must be a map');
  }

  return _.map(envs || {}, (v, k) => {
    if (k === 'PATH') {
      return `${k}=${v}:$PATH`;
    } else if (k === 'LD_LIBRARY_PATH') {
      return `${k}=${v}:$LD_LIBRARY_PATH`;
    }
    return `${k}=${v}`;
  });
}
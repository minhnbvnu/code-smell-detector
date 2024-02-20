function castEnvironmentVariables(environments) {
  const envs = Object.assign({}, environments);

  for (let key in envs) {
    if (envs.hasOwnProperty(key)) {

      if (_.isObject(envs[key]) || _.isNull(envs[key])) {
        throw new Error(`InvalidError: the value of '${key}' in EnvironmentVariables must be a string.`);
      }

      if (!isNaN(envs[key])) {
        console.log(`the value in environmentVariables:${envs[key]} cast String Done`);
        envs[key] = envs[key] + '';
      }
    }
  }

  return envs;
}
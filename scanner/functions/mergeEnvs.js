function mergeEnvs(functionRes, envs) {
  const functionProp = (functionRes.Properties || {});
  const formerEnvs = (functionProp.EnvironmentVariables) || {};

  const customizer = (objValue, srcValue) => {
    if (objValue) {
      const spliceEnvs = objValue + ':' + srcValue;
      const uniqEnvs = _.uniq(spliceEnvs.split(':'));
      return _.join(uniqEnvs, ':');
    }
    return srcValue;
  };
  return _.mergeWith(formerEnvs, envs, customizer);
}
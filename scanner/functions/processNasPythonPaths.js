async function processNasPythonPaths(tpl, tplPath) {
  const updatedTplContent = _.cloneDeep(tpl);

  for (const { serviceRes } of definition.findServices(updatedTplContent.Resources)) {
    const nasConfig = (serviceRes.Properties || {}).NasConfig;

    if (_.isEmpty(nasConfig)) { continue; }
    const nasEnv = generateNasPythonPaths(nasConfig);

    for (const { functionRes } of definition.findFunctions(serviceRes)) {

      if (!_.includes(['python2.7', 'python3'], functionRes.Properties.Runtime)) { continue; }
      functionRes.Properties.EnvironmentVariables = mergeEnvs(functionRes, nasEnv);
    }
  }

  return updatedTplContent;
}
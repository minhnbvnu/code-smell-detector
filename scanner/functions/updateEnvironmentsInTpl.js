function updateEnvironmentsInTpl({ tplPath, tpl, envs,
  serviceName,
  functionName,
  displayLog = true
}) {
  const updatedTplContent = _.cloneDeep(tpl);

  const { functionRes } = definition.findFunctionByServiceAndFunctionName(updatedTplContent.Resources, serviceName, functionName);

  const mergedEnvs = mergeEnvs(functionRes, envs);

  if (_.isEmpty(functionRes['Properties'])) {
    functionRes.Properties = {
      'EnvironmentVariables': mergedEnvs
    };
  } else {
    functionRes.Properties.EnvironmentVariables = mergedEnvs;
  }

  util.outputTemplateFile(tplPath, updatedTplContent);

  if (displayLog) {
    console.log(green(`Fun add environment variables to '${serviceName}/${functionName}' in ${tplPath}`));
  }

  return updatedTplContent;
}
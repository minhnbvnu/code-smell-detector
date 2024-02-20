async function processOtherFunctionsUnderServiceIfNecessary({
  baseDir, codeUri, runtime, envs, tpl, tplPath,
  originServiceName, originFunctionName
}) {

  let tplChanged = false;

  const otherFunctions = definition.findFunctionsInTpl(tpl, (functionName, functionRes) => {
    return originFunctionName !== functionName;
  });

  if (_.isEmpty(otherFunctions)) { return { updatedEnvsTpl: tpl, tplChanged }; }

  const pendingFuntions = otherFunctions.filter(m => {
    const functionProp = m.functionRes.Properties;

    const otherCodeUri = (functionProp || {}).CodeUri;
    const otherAbsCodeUri = path.resolve(baseDir, otherCodeUri);
    const otherRuntime = (functionProp || {}).Runtime;

    return (_.isEqual(runtimeDependencyMappings[runtime], runtimeDependencyMappings[otherRuntime]) && codeUri === otherAbsCodeUri);
  });

  if (_.isEmpty(pendingFuntions)) { return { updatedEnvsTpl: tpl, tplChanged }; }

  for (const pendingFuntion of pendingFuntions) {

    tpl = updateEnvironmentsInTpl({
      tplPath, tpl, envs,
      serviceName: originServiceName,
      functionName: pendingFuntion.functionName
    });
  }

  return {
    updatedEnvsTpl: tpl,
    tplChanged: true
  };
}
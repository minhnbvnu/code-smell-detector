async function updateEnvironments({
  tplPath, tpl, envs, baseDir, codeUri, runtime,
  serviceName, functionName
}) {

  const updatedTplContent = updateEnvironmentsInTpl({ envs, tpl, tplPath, serviceName, functionName });

  return await processOtherFunctionsUnderServiceIfNecessary({
    tpl: updatedTplContent, tplPath,
    baseDir, codeUri, runtime, envs,
    originServiceName: serviceName,
    originFunctionName: functionName
  });
}
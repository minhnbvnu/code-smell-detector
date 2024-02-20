function deleteUnmatchFunctionsUnderServiceRes({
  serviceName,
  serviceRes,
  functionName
}) {
  const functionNamesInService = findFunctions(serviceRes).map(funRes => {
    return funRes.functionName;
  });

  if (!_.includes(functionNamesInService, functionName)) {
    throw new Error(`could not found service/function：` + green(`${serviceName}`) + `/` + red(`${functionName}`));
  }

  for (let functions of findFunctions(serviceRes)) {
    if (functions.functionName !== functionName) {
      serviceRes = _.omit(serviceRes, functions.functionName);
    }
  }

  return serviceRes;
}
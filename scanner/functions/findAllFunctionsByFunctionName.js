function findAllFunctionsByFunctionName(resources, functionName) {

  let functions = [];

  for (let { serviceName, serviceRes } of findServices(resources)) {
    debug('servicename: ' + serviceName);
    const functionRes = findFunctionInService(functionName, serviceRes);

    if (functionRes) {

      functions.push({
        serviceName,
        serviceRes,
        functionName,
        functionRes
      });
    }
  }
  return functions;
}
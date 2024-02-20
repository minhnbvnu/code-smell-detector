function findFunctionByFunctionName(resources, functionName) {
  // iterator all services and functions
  for (let { serviceName, serviceRes } of findServices(resources)) {
    debug('servicename: ' + serviceName);
    const functionRes = findFunctionInService(functionName, serviceRes);

    if (functionRes) {
      return {
        serviceName,
        serviceRes,
        functionName,
        functionRes
      };
    }
  }

  return {};
}
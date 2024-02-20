function findFunctionByServiceAndFunctionName(resources, serviceName, functionName) {
  debug('begin search serviceName and functionName');

  let serviceRes = resources[serviceName];

  if (!serviceRes || !serviceName || serviceRes.Type !== SERVICE_RESOURCE) {
    throw new Error(`could not found service: ${serviceName}`);
  }

  let functionRes = serviceRes[functionName];

  if (functionRes && functionRes.Type !== FUNCTION_RESOURCE) {
    functionRes = null;
  }

  return {
    serviceName,
    serviceRes,
    functionName,
    functionRes
  };
}
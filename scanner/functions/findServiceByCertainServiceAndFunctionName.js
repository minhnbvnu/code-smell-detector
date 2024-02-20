function findServiceByCertainServiceAndFunctionName(resources, certainServiceName, certainFunctionName) {
  for (let { serviceName, serviceRes } of findServices(resources)) {
    if (serviceName === certainServiceName) {
      serviceRes = deleteUnmatchFunctionsUnderServiceRes({
        serviceName,
        serviceRes,
        functionName: certainFunctionName
      });

      return {
        serviceName,
        serviceRes
      };
    }
  }
  throw new Error(`could not found service: ${certainServiceName}`);
}
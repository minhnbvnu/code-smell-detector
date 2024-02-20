function iterateFunctions(tplContent, callback) {
  if (tplContent.Resources) {
    const resources = tplContent.Resources;

    iterateResources(resources, SERVICE_RESOURCE, (serviceName, serviceRes) => {
      iterateResources(serviceRes, FUNCTION_RESOURCE, (functionName, functionRes) => {
        callback(
          serviceName,
          serviceRes,
          functionName,
          functionRes
        );
      });
    });
  }
}
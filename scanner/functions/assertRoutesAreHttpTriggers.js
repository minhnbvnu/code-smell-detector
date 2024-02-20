function assertRoutesAreHttpTriggers(routes, httpTriggers) {
  if (!_.isEmpty(routes)) {
    const serviceNames = httpTriggers.map(h => h.serviceName);
    const functionNames = httpTriggers.map(h => h.functionName);
    for (const route of routes) {
      if (!_.includes(serviceNames, route.serviceName) || !_.includes(functionNames, route.functionName)) {
        throw new Error(`can't find ${route.serviceName}/${route.functionName} in template.yml or function ${route.serviceName}/${route.functionName} is not http trigger.`);
      }
    }
  }
}
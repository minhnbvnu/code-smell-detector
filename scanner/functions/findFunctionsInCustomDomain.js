function findFunctionsInCustomDomain(tpl) {
  const functions = [];

  iterateResources(tpl.Resources, 'Aliyun::Serverless::CustomDomain', (domainLogicId, domainDefinition) => {
    const properties = (domainDefinition.Properties || {});
    const routeConfig = properties.RouteConfig || {};
    const routes = routeConfig.Routes || routeConfig.routes;

    if (_.isEmpty(routes)) { return; }

    for (const route of Object.entries(routes)) {
      const serviceName = route[1].ServiceName || route[1].serviceName;
      const functionName = route[1].FunctionName || route[1].functionName;
      functions.push({
        serviceName,
        functionName
      });
    }
  });

  return functions;
}
function getRoutesByRoutePath(tplRouteConfig, routePath, domainName) {
  if (routePath && !_.includes(Object.keys(tplRouteConfig), routePath)) {
    throw new Error(`can't find ${routePath} in Routes definition`);
  }
  const routes = [];

  for (const [path, func] of Object.entries(tplRouteConfig)) {
    routes.push({
      domainName,
      path,
      serviceName: func.ServiceName || func.serviceName,
      functionName: func.FunctionName || func.functionName
    });
  }
  return routePath ? routes.filter(f => { return f.path === routePath; }) : routes;
}
function getRoutesByDomainPath(tpl, domainName, routePath) {
  for (const [name, resource] of Object.entries(tpl.Resources)) {
    if (name === domainName && resource.Type === 'Aliyun::Serverless::CustomDomain') {
      const properties = (resource.Properties || {});
      const tplRouteConfig = properties.RouteConfig.Routes || properties.RouteConfig.routes;
      return getRoutesByRoutePath(tplRouteConfig, routePath, domainName);
    }
  }
  return [];
}
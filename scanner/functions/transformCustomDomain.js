function transformCustomDomain(tpl) {
  const cloneTpl = _.cloneDeep(tpl);

  const domainNeedUpdate = [];

  iterateResources(cloneTpl.Resources, 'Aliyun::Serverless::CustomDomain', (domainLogicId, domainDefinition) => {
    domainNeedUpdate.push({
      domainDefinition
    });
  });

  for (const { domainDefinition } of domainNeedUpdate) {
    const properties = (domainDefinition.Properties || {});
    const routeConfig = properties.RouteConfig || {};
    const routes = routeConfig.Routes || routeConfig.routes;

    if (_.isEmpty(routes)) { continue; }

    properties.RouteConfig.Routes = transformRoutesToRosTemplate(routes);
  }

  return cloneTpl;
}
async function getPathConfigFromRosTemplate(rosResources) {
  const pathConfig = [];

  for (const res of Object.values(rosResources)) {
    if ((res || {}).Type === 'ALIYUN::FC::CustomDomain') {

      const resProp = res.Properties || {};
      const domainName = resProp.DomainName;
      const routes = (resProp.RouteConfig || {}).Routes;

      if (_.isEmpty(routes)) { continue; }

      for (const route of routes) {

        if (route.FunctionName['Fn::GetAtt']) {

          const realFunction = findRealFunction(rosResources, _.head(route.FunctionName['Fn::GetAtt']));
          realFunction.path = route.Path;
          realFunction.domainName = domainName;
          pathConfig.push(realFunction);
        }
      }
    }
  }
  return pathConfig;
}
async function processTemporaryDomainIfNecessary(domainLogicId, domainDefinition, resources) {
  const properties = (domainDefinition.Properties || {});

  const protocol = properties.Protocol;
  const realDomainName = properties.DomainName;
  const routesConfig = properties.RouteConfig.Routes || properties.RouteConfig.routes;

  const routes = convertRoutesConfigToRoutes(routesConfig);

  if (!realDomainName) {
    return {
      routes,
      domainName: domainLogicId
    };
  }

  if (realDomainName !== 'Auto') {
    return {
      routes,
      domainName: realDomainName
    };
  }
  console.log(yellow(`Detect 'DomainName:Auto' of custom domain '${domainLogicId}'`));
  const tmpDomainName = await getReuseTmpDomainName(routes);

  if (tmpDomainName) {
    return {
      routes,
      domainName: tmpDomainName
    };
  }
  console.log(`Request a new temporary domain ...`);
  const domainName = await processTemporaryDomain(resources, _.head(_.values(routes)), protocol);

  return {
    routes,
    domainName
  };
}
async function customDomain(domainName, domainDefinition, routes) {
    await proxyquire('../../lib/deploy/deploy-by-tpl', {
      './deploy-support': deploySupport
    }).deployCustomDomain(domainName, domainDefinition, routes);
  }
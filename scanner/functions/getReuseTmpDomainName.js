async function getReuseTmpDomainName(tplRoutes) {
  const customDomains = await listCustomDomains();

  const tmpDomains = customDomains.filter(f => {
    return _.endsWith(f.domainName, '.test.functioncompute.com');
  });

  if (_.isEmpty(tmpDomains)) { return null; }

  for (const tmpDomain of tmpDomains) {
    const routes = tmpDomain.routeConfig.routes;
    const tmpDomainName = tmpDomain.domainName;
    const protocol = tmpDomain.protocol;

    for (const route of routes) {

      for (const tplRoute of tplRoutes) {
        if (tplRoute.serviceName === route.serviceName && tplRoute.functionName === route.functionName) {

          const { expiredTime, timesLimit, expiredTimeObj } = await getTmpDomainExpiredTime(tmpDomainName);

          if (expiredTime > Math.round(new Date().getTime() / 1000)) {
            console.log(`Fun will reuse the temporary domain ${yellow(parseProtocol(protocol, tmpDomainName))}, expired at ${yellow(date.format(expiredTimeObj, 'YYYY-MM-DD HH:mm:ss'))}, limited by ${yellow(timesLimit)} per day.\n`);
            return tmpDomainName;
          }
        }
      }
    }
  }
  return null;
}
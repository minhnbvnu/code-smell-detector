function addRoutesInfoToHttpTrigger(httpTrigger, route) {
  const replace = Object.assign({}, httpTrigger);
  if (route.serviceName === replace.serviceName && route.functionName === replace.functionName ) {
    replace.path = route.path;
    replace.domainName = route.domainName;
    return replace;
  }
  return null;
}
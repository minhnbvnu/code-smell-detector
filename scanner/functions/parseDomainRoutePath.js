function parseDomainRoutePath(domainRoutePath) {
  let domainName = null;
  let routePath = null;

  if (!domainRoutePath) { return []; }

  const index = domainRoutePath.indexOf('/');
  if (index < 0) {
    domainName = domainRoutePath;
  } else {
    domainName = domainRoutePath.substring(0, index);
    routePath = domainRoutePath.substring(index);
  }
  return [domainName, routePath];
}
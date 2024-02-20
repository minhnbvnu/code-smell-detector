function getRootDomain(url) {
  if (url in rootDomainCache) {
    // After storing 128 entries, it will delete the oldest each time.
    const returnValue = rootDomainCache[url];
    if (Object.keys(rootDomainCache).length > 128) {
      delete rootDomainCache[(Object.keys(rootDomainCache)[0])];
    }
    return returnValue;
  }

  const urlObject = new URL(url);
  if (urlObject.hostname === "") { return false; }
  const parsedUrl = psl.parse(urlObject.hostname);

  rootDomainCache[url] = parsedUrl.domain;
  return parsedUrl.domain;

}
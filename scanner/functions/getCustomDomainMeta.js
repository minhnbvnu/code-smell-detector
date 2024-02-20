async function getCustomDomainMeta(domainName) {
  const fc = await getFcClient();
  const { data } = await fc.getCustomDomain(domainName);
  return data;
}
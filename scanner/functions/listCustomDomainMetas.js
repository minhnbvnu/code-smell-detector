async function listCustomDomainMetas() {
  const fc = await getFcClient();
  const { data } = await fc.listCustomDomains();
  return data.customDomains;
}
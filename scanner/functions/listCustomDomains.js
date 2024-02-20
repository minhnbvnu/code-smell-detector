async function listCustomDomains() {
  const fc = await getFcClient();
  const rs = await fc.listCustomDomains();
  return rs.data.customDomains;
}
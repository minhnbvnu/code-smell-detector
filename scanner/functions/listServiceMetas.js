async function listServiceMetas() {
  const fc = await getFcClient();
  const { data } = await fc.listServices();
  return data.services;
}
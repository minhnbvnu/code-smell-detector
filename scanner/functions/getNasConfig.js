async function getNasConfig(serviceName) {
  const serviceMeta = await getServiceMeta(serviceName);
  return serviceMeta.nasConfig;
}
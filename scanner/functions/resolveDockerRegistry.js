async function resolveDockerRegistry() {
  await doImageRegisterEventTag('start');
  if (DOCKER_REGISTRY_CACHE) {
    return DOCKER_REGISTRY_CACHE;
  }
  const promises = DOCKER_REGISTRIES.map(r => httpx.request(`https://${r}/v2/aliyunfc/runtime-nodejs8/tags/list`, { timeout: 3000 }).then(() => r));
  try {
    DOCKER_REGISTRY_CACHE = await Promise.race(promises);
  } catch (error) {
    DOCKER_REGISTRY_CACHE = DEFAULT_REGISTRY;
  }
  await doImageRegisterEventTag(DOCKER_REGISTRY_CACHE);
  return DOCKER_REGISTRY_CACHE;
}
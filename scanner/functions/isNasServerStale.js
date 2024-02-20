async function isNasServerStale(serviceName, nasConfig, version) {

  return !(await isSameVersion(serviceName, version) && await isSameNasConfig(serviceName, nasConfig));
}
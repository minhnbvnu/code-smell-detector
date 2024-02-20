function getNasHttpTriggerPath(serviceName) {
  let nasServiceName;
  if (serviceName.indexOf(constants.FUN_NAS_SERVICE_PREFIX) !== 0) {
    nasServiceName = constants.FUN_NAS_SERVICE_PREFIX + serviceName;
  } else {
    nasServiceName = serviceName;
  }
  return `/${PROXY}/${nasServiceName}/${constants.FUN_NAS_FUNCTION}/`;
}
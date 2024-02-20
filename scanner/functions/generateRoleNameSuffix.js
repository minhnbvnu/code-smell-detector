function generateRoleNameSuffix(serviceName) {
  if (serviceName.startsWith(constants.FUN_NAS_SERVICE_PREFIX)) {
    return serviceName.substring(constants.FUN_NAS_SERVICE_PREFIX.length);
  }
  return serviceName;
}
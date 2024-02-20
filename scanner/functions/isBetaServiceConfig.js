function isBetaServiceConfig(serviceConfig) {
  return (
    isObjectHasLength(serviceConfig) &&
    (isStringHasLength(serviceConfig.service) ||
      isStringHasLength(serviceConfig.name)) &&
    isStringHasLength(serviceConfig.version)
  );
}
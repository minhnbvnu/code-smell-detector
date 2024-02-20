function matchPathConfig(pathConfigs, serviceName, functionName) {
  for (const config of pathConfigs) {
    if (config.realServiceName === serviceName && config.realFunctionName === functionName) {
      return config;
    }
  }
  return null;
}
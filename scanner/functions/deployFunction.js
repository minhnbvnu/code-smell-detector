async function deployFunction({ baseDir, nasConfig, vpcConfig, useNas, assumeYes,
  serviceName, functionName, functionRes,
  onlyConfig, tplPath, skipTrigger = false
}) {
  const properties = functionRes.Properties || {};

  const rs = await makeFunction(baseDir, {
    serviceName,
    functionName,
    description: properties.Description,
    handler: properties.Handler,
    initializer: properties.Initializer,
    timeout: properties.Timeout,
    initializationTimeout: properties.InitializationTimeout,
    memorySize: properties.MemorySize,
    runtime: properties.Runtime,
    codeUri: properties.CodeUri,
    customContainerConfig: properties.CustomContainerConfig,
    cAPort: properties.CAPort,
    instanceType: properties.InstanceType,
    asyncConfiguration: properties.AsyncConfiguration,
    environmentVariables: properties.EnvironmentVariables,
    instanceConcurrency: properties.InstanceConcurrency,
    layers: properties.Layers,
    nasConfig,
    vpcConfig,
    InstanceLifecycleConfig: properties.InstanceLifecycleConfig
  }, onlyConfig, tplPath, useNas, assumeYes);

  if (!skipTrigger) {
    await deployTriggers(serviceName, functionName, functionRes.Events, tplPath);
  }

  return rs;
}
function parseFunctionResource(functionMeta) {
  const functionResource = {
    Type: FUNCTION_TYPE,
    Properties: {}
  };
  const properties = functionResource.Properties;
  doProp(properties, 'Description', functionMeta.description);
  doProp(properties, 'Initializer', functionMeta.initializer);
  if (functionMeta.initializer) {
    doProp(properties, 'InitializationTimeout', functionMeta.initializationTimeout);
  }
  doProp(properties, 'Handler', functionMeta.handler);
  doProp(properties, 'Runtime', functionMeta.runtime);
  doProp(properties, 'Timeout', functionMeta.timeout);
  doProp(properties, 'MemorySize', functionMeta.memorySize);
  doProp(properties, 'InstanceConcurrency', functionMeta.instanceConcurrency);
  doProp(properties, 'EnvironmentVariables', functionMeta.environmentVariables);

  return functionResource;
}
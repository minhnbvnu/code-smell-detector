async function getServiceResource(serviceMeta, fullOutputDir, recursive, onlyConfig) {
  debug('Service metadata: %s', serviceMeta);
  const serviceName = serviceMeta.serviceName;
  const serviceResource = parseServiceResource(serviceMeta);
  console.log(`${green('✔')} ${serviceName} - ${grey('Service')}`);

  if (recursive) {
    const functionMetas = await getFunctionMetas(serviceName);
    if (functionMetas && functionMetas.length > 0) {
      for (const functionMeta of functionMetas) {
        debug('Function metadata: %s', functionMeta);
        const functionName = functionMeta.functionName;
        const functionResource = await getFunctionResource(serviceName, functionMeta, fullOutputDir, recursive, onlyConfig);
        serviceResource[functionName] = functionResource;
      }
    }
  }
  return serviceResource;
}
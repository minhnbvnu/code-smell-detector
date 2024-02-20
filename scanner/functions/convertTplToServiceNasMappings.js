async function convertTplToServiceNasMappings(nasBaseDir, tpl) {
  const serviceNasMappings = {};

  for (const { serviceName, serviceRes } of definition.findServices(tpl.Resources)) {
    const nasConfig = (serviceRes.Properties || {}).NasConfig;

    const nasMappings = await convertNasConfigToNasMappings(nasBaseDir, nasConfig, serviceName);

    serviceNasMappings[serviceName] = nasMappings;
  }

  return serviceNasMappings;
}
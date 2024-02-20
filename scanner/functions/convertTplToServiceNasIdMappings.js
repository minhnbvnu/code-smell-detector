function convertTplToServiceNasIdMappings(tpl) {
  const serviceNasIdMappings = {};

  for (const { serviceName, serviceRes } of definition.findServices(tpl.Resources)) {
    const nasConfig = (serviceRes.Properties || {}).NasConfig;
    var nasId;
    if (nasConfig === undefined) {
      nasId = {};
    } else {
      nasId = getNasIdFromNasConfig(nasConfig);
    }

    serviceNasIdMappings[serviceName] = nasId;
  }

  return serviceNasIdMappings;
}
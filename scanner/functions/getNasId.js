function getNasId(tpl, serviceName) {
  const serviceNasIdMappings = convertTplToServiceNasIdMappings(tpl);
  return serviceNasIdMappings[serviceName];
}
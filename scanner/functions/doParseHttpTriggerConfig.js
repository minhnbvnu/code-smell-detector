function doParseHttpTriggerConfig(triggerResource, triggerConfig) {
  triggerResource.Type = 'HTTP';
  const properties = triggerResource.Properties;
  doProp(properties, 'AuthType', triggerConfig.authType);
  doProp(properties, 'Methods', triggerConfig.methods);
}
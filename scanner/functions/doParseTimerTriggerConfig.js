function doParseTimerTriggerConfig(triggerResource, triggerConfig) {
  triggerResource.Type = 'Timer';
  const properties = triggerResource.Properties;
  doProp(properties, 'Payload', triggerConfig.payload);
  doProp(properties, 'CronExpression', triggerConfig.cronExpression);
  doProp(properties, 'Enable', triggerConfig.enable);
}
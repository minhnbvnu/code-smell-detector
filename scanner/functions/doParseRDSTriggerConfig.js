function doParseRDSTriggerConfig(triggerResource, triggerConfig) {
  triggerResource.Type = 'RDS';
  const properties = triggerResource.Properties;
  doProp(properties, 'InstanceId', triggerConfig.instanceId);
  doProp(properties, 'SubscriptionObjects', triggerConfig.subscriptionObjects);
  doProp(properties, 'Retry', triggerConfig.retry);
  doProp(properties, 'Concurrency', triggerConfig.concurrency);
  doProp(properties, 'EventFormat', triggerConfig.eventFormat);
}
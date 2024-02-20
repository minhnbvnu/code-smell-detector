function doParseTableStoreTriggerConfig(triggerResource, triggerConfig) {
  triggerResource.Type = 'TableStore';
  const properties = triggerResource.Properties;
  doProp(properties, 'InstanceName', triggerConfig.instanceName);
  doProp(properties, 'TableName', triggerConfig.tableName);
}
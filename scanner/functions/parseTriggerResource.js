function parseTriggerResource(triggerMeta) {
  const triggerType = triggerMeta.triggerType;
  const triggerResource = {
    Type: '',
    Properties: {}
  };
  const properties = triggerResource.Properties;
  doProp(properties, 'InvocationRole', triggerMeta.invocationRole);
  doProp(properties, 'SourceArn', triggerMeta.sourceArn);
  doProp(properties, 'Qualifier', triggerMeta.qualifier);
  if (triggerType === 'oss') {
    doParseOSSTriggerConfig(triggerResource, triggerMeta.triggerConfig);
  } else if (triggerType === 'log') {
    doParseLogTriggerConfig(triggerResource, triggerMeta.triggerConfig);
  } else if (triggerType === 'timer') {
    doParseTimerTriggerConfig(triggerResource, triggerMeta.triggerConfig);
  } else if (triggerType === 'http') {
    doParseHttpTriggerConfig(triggerResource, triggerMeta.triggerConfig);
  } else if (triggerType === 'tablestore') {
    doParseTableStoreTriggerConfig(triggerResource, triggerMeta.triggerConfig);
  } else if (triggerType === 'cdn_events') {
    doParseCDNTriggerConfig(triggerResource, triggerMeta.triggerConfig);
  } else if (triggerType === 'rds') {
    doParseRDSTriggerConfig(triggerResource, triggerMeta.triggerConfig);
  } else if (triggerType === 'mns_topic') {
    doParseMNSTopicTriggerConfig(triggerResource, triggerMeta.triggerConfig);
  } else {
    throw new Error(`Trigger type is not supported: ${triggerType}.`);
  }
  return triggerResource;
}
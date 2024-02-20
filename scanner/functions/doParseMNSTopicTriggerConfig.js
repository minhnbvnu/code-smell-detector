function doParseMNSTopicTriggerConfig(triggerResource, triggerConfig) {
  triggerResource.Type = 'MNSTopic';
  const properties = triggerResource.Properties;
  doProp(properties, 'TopicName', triggerConfig.topicName);
  doProp(properties, 'Region', triggerConfig.region);
  doProp(properties, 'NotifyContentFormat', triggerConfig.notifyContentFormat);
  doProp(properties, 'NotifyStrategy', triggerConfig.notifyStrategy);
  doProp(properties, 'FilterTag', triggerConfig.filterTag);
}
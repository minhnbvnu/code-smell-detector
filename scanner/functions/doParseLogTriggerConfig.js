function doParseLogTriggerConfig(triggerResource, triggerConfig) {
  triggerResource.Type = 'Log';
  const properties = triggerResource.Properties;
  properties.SourceConfig = {
    Logstore: triggerConfig.sourceConfig.logstore
  };
  properties.JobConfig = {
    MaxRetryTime: triggerConfig.jobConfig.maxRetryTime,
    TriggerInterval: triggerConfig.jobConfig.triggerInterval
  };
}
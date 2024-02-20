function doParseOSSTriggerConfig(triggerResource, triggerConfig) {
  triggerResource.Type = 'OSS';
  const properties = triggerResource.Properties;
  doProp(properties, 'Events', triggerConfig.events);
  doProp(properties, 'BucketName', triggerConfig.bucketName);
  const filter = triggerConfig.filter;
  if (filter) {
    properties.Filter = {
      Key: {
        Prefix: filter.key.prefix,
        Suffix: filter.key.suffix
      }
    };
  }
}
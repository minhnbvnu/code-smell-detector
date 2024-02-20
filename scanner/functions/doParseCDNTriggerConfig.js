function doParseCDNTriggerConfig(triggerResource, triggerConfig) {
  triggerResource.Type = 'CDN';
  const properties = triggerResource.Properties;
  doProp(properties, 'EventName', triggerConfig.eventName);
  doProp(properties, 'EventVersion', triggerConfig.eventVersion);
  doProp(properties, 'Notes', triggerConfig.notes);
  const filter = triggerResource.filter;
  if (filter) {
    properties.Filter = {
      Domain: filter.domain
    };
  }
}
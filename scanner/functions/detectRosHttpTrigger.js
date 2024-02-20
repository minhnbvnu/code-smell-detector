async function detectRosHttpTrigger(rosResources) {

  const pathConfig = await getPathConfigFromRosTemplate(rosResources);

  for (const v of Object.values(rosResources)) {
    if ((v || {}).Type === 'ALIYUN::FC::Trigger') {
      const triggerProp = v.Properties || {};
      const triggerProperties = triggerProp.TriggerConfig;

      const serviceName = triggerProp.ServiceName;
      const functionName = triggerProp.FunctionName;
      const triggerName = triggerProp.TriggerName;

      const config = matchPathConfig(pathConfig, serviceName, functionName);

      console.log();

      if (config) {
        displayDomainInfo(config.path, config.domainName, triggerName, triggerProperties);
        continue;
      }

      await trigger.displayTriggerInfo(serviceName, functionName, triggerName, triggerProp.TriggerType, triggerProperties, '', rosResources);
    }
  }
}
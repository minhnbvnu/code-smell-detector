async function deployTrigger(serviceName, functionName, triggerName, triggerDefinition) {
  if (triggerDefinition.Type === 'Api') {
    await makeApiTrigger({
      serviceName,
      functionName,
      triggerName,
      method: ((triggerDefinition.Properties || {}).Method || 'GET').toUpperCase(),
      requestPath: (triggerDefinition.Properties || {}).Path,
      restApiId: (triggerDefinition.Properties || {}).RestApiId
    });
  } else if (triggerDefinition.Type === 'Datahub') {
    console.error(`Try to create Datahub Trigger, but the SDK didn't OK.`);
  } else {
    await makeTrigger({
      serviceName,
      functionName,
      triggerName,
      triggerType: triggerDefinition.Type,
      triggerProperties: triggerDefinition.Properties
    });
  }
}
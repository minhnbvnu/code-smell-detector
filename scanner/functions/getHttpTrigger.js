async function getHttpTrigger(serviceName, functionName) {
  const triggers = await getTriggerMetas(serviceName, functionName);

  if (_.isEmpty(triggers)) { return []; }

  const httpTrigger = triggers.filter(t => t.triggerType === 'http' || t.triggerType === 'https');

  if (_.isEmpty(httpTrigger)) { return []; }

  return httpTrigger;
}
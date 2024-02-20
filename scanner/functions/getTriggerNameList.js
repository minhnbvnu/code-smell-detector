async function getTriggerNameList({
  serviceName,
  functionName
}) {
  const fc = await getFcClient();
  var listTriggerResponse = await fc.listTriggers(serviceName, functionName);

  var triggerNameArray = [];

  if (listTriggerResponse && listTriggerResponse.data.triggers) {
    triggerNameArray = listTriggerResponse.data.triggers.map(p => p.triggerName);
  }
  return triggerNameArray;
}
async function deleteTrigger(serviceName, functionName, triggerName) {
  const fc = await getFcClient();
  await fc.deleteTrigger(serviceName, functionName, triggerName);
}
async function deleteFunction(serviceName, functionName, triggerName) {
  const fc = await getFcClient();

  if (triggerName) {
    await fc.deleteTrigger(serviceName, functionName, triggerName);
  }

  await fc.deleteFunction(serviceName, functionName);
}
function findHttpTriggersInFunction(functionRes) {
  const triggers = [];

  if (functionRes.Events) {
    iterateResources(functionRes.Events, 'HTTP', (triggerName, triggerRes) => {
      triggers.push({
        triggerName,
        triggerRes
      });
    });
  }

  return triggers;
}
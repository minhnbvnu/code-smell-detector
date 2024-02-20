function findHttpTriggersInTpl(tpl) {
  const resources = tpl.Resources;

  const httpTriggers = [];

  for (let { serviceName, serviceRes } of findServices(resources)) {
    for (let { functionName, functionRes } of findFunctions(serviceRes)) {
      for (let { triggerName, triggerRes } of findHttpTriggersInFunction(functionRes)) {
        httpTriggers.push({
          serviceName,
          serviceRes,
          functionName,
          functionRes,
          triggerName,
          triggerRes
        });
      }
    }
  }

  return httpTriggers;
}
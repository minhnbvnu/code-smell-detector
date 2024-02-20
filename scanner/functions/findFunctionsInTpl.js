function findFunctionsInTpl(tpl, filter) {
  const functions = [];

  const resources = tpl.Resources;

  for (let { serviceName, serviceRes } of findServices(resources)) {
    for (let { functionName, functionRes } of findFunctions(serviceRes)) {

      if (filter && !filter(functionName, functionRes)) { continue; }

      functions.push({
        serviceName,
        serviceRes,
        functionName,
        functionRes
      });
    }
  }

  return functions;
}
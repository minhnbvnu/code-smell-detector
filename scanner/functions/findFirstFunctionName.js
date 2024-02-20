function findFirstFunctionName(tpl) {
  const resources = tpl.Resources;

  var firstInvokeName;

  for (let { serviceName, serviceRes } of findServices(resources)) {
    for (let { functionName } of findFunctions(serviceRes)) {
      firstInvokeName = serviceName + '/' + functionName;
      break;
    }
  }

  if (!firstInvokeName) {
    throw new Error(red(`Missing function definition in template.yml`)); 
  }
  return firstInvokeName;
}
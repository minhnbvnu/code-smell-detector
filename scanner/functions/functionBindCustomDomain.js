function functionBindCustomDomain(serviceName, functionName, tpl) {
  const functions = findFunctionsInCustomDomain(tpl);
  const bindFunction = _.find(functions, { serviceName, functionName });
  return !_.isEmpty(bindFunction);
}
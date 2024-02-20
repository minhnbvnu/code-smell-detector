function doFindFunctionInTpl(serviceName, functionName, tpl) {

  const resources = tpl.Resources;

  if (serviceName) {
    // invokeName is serviceName/functionName
    return findFunctionByServiceAndFunctionName(resources, serviceName, functionName);
  }
  //  invokeName is functionName
  return findFunctionByFunctionName(resources, functionName);
}
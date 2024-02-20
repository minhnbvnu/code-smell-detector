function findFunctionInTpl(funcPath, tpl) {
  const [serviceName, functionName] = parseFunctionPath(funcPath);
  return doFindFunctionInTpl(serviceName, functionName, tpl);
}
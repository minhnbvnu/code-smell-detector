function findFunctionInService(funcName, serviceRes) {

  debug('find function ' + funcName + ' definition in service: ' + JSON.stringify(serviceRes));
  for (let { functionName, functionRes } of findFunctions(serviceRes)) {
    debug(`functionName is ${functionName}, compare with ${functionName}`);
    if (functionName === funcName) {
      debug(`found function ${functionName}, functionRes is ${functionRes}`);
      return functionRes;
    }
  }

  return null;
}
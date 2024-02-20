async function certainInvokeName(invokeName) {

  const [parsedServiceName, parsedFunctionName] = parseFunctionPath(invokeName);

  if (!parsedServiceName) {
    // fun invoke || fun invoke functionName
    return await findFunctionInCurrentDirectory(parsedFunctionName);
  }

  return {
    serviceName: parsedServiceName,
    functionName: parsedFunctionName
  };
}
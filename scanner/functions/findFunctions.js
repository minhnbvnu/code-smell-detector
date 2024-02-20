function findFunctions(serviceRes) {

  const functions = [];

  iterateResources(serviceRes, FUNCTION_RESOURCE, (functionName, functionRes) => {
    functions.push({
      functionName,
      functionRes
    });
  });

  return functions;
}
async function matchingResourceBySourceName(resources, sourceName) {

  const resourceObj = findResourceByName(resources, sourceName);

  if (!_.isEmpty(resourceObj)) {
    return resourceObj;
  }

  const functions = findAllFunctionsByFunctionName(resources, sourceName);

  if (functions.length === 0) {

    throw new Error(`could not found sourceName: ${sourceName}`);
  } else if (functions.length > 1) {

    const { serviceName, functionName } = await promptForFunctionSelection(functions);

    const selectionFunction = functions.find(funcObj => {

      return funcObj.serviceName === serviceName && funcObj.functionName === functionName;
    });
    // delete unmatch functions under a serviceRes
    const serviceRes = deleteUnmatchFunctionsUnderServiceRes(selectionFunction);

    return {
      resourceName: selectionFunction.serviceName,
      resourceRes: serviceRes
    };
  }

  const serviceName = _.first(functions).serviceName;
  let serviceRes = _.first(functions).serviceRes;

  serviceRes = deleteUnmatchFunctionsUnderServiceRes({
    serviceName,
    serviceRes,
    functionName: sourceName
  });

  return {
    resourceName: serviceName,
    resourceRes: serviceRes
  };
}
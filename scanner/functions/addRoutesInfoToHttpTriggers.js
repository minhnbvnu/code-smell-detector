function addRoutesInfoToHttpTriggers(httpTriggers, routes) {
  return routes.reduce((acc, cur) => {
    for (const httpTrigger of httpTriggers) {
      const httpTriggerWithRoute = addRoutesInfoToHttpTrigger(httpTrigger, cur);
      if (!_.isEmpty(httpTriggerWithRoute)) {
        acc.push(httpTriggerWithRoute);
      }
    }
    return acc;
  }, []);
}
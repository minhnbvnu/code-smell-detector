function transformRoutesToRosTemplate(routes) {
  const transFormRoutes = Object.assign({}, routes);

  const result = {};
  for (const route of Object.entries(transFormRoutes)) {
    const serviceName = route[1].ServiceName || route[1].serviceName;
    const functionName = route[1].FunctionName || route[1].functionName;
    if (!needToTransForm(serviceName, functionName)) { result[route[0]] = route[1]; }
    else {
      result[route[0]] = generateRosTemplateForPathConfig(serviceName, functionName);
    }
  }

  return result;
}
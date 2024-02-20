function parseParameterOverride(parameterOverride) {
  const parameters = [];
  for (const [key, value] of Object.entries(parameterOverride)) {
    parameters.push({
      'ParameterKey': key,
      'ParameterValue': value
    });
  }
  return parameters;
}
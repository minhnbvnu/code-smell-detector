function validateParameters(parametersInTpl = {}, parameterOverride = {}) {
  for (const key of Object.keys(parameterOverride)) {
    if (!_.includes(Object.keys(parametersInTpl), key)) {
      throw new Error(`Incorrect parameters: '${key}' are not defined in yml.`);
    }
  }
}
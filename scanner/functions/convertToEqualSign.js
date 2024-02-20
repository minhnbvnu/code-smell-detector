function convertToEqualSign(parameterOverride) {
  return parseParameterOverride(parameterOverride).map(m => {
    const key = m.ParameterKey;
    const value = m.ParameterValue;
    return `${key}=${value}`;
  });
}
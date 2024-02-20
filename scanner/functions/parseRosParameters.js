function parseRosParameters(parametersInTpl, parameterOverride) {
  if (_.isEmpty(parameterOverride)) { return {}; }

  if (_.isEmpty(parametersInTpl)) {
    if (!_.isEmpty(parameterOverride)) {
      console.warn(red(`\nDetectionWarning: ${convertToEqualSign(parameterOverride).join(', ')} are not defined in yml.`));
    }
    return {};
  }

  validateParameters(parametersInTpl, parameterOverride);

  return transformParameters(parseParameterOverride(parameterOverride));
}
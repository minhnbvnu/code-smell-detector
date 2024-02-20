function useParameter(parameterKey, defaultValue) {
  var _useStoryContext = useStoryContext(),
      parameters = _useStoryContext.parameters;

  if (parameterKey) {
    var _parameters$parameter;

    return (_parameters$parameter = parameters[parameterKey]) !== null && _parameters$parameter !== void 0 ? _parameters$parameter : defaultValue;
  }

  return undefined;
}
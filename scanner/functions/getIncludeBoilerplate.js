function getIncludeBoilerplate (options) {
  if (options && options.includeBoilerplate !== undefined && options.includeBoilerplate !== null) {
    return options.includeBoilerplate;
  }
  return false;
}
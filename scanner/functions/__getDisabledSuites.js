function __getDisabledSuites(disabledSuites) {
  const disabledSuitesMap = {};
  if (disabledSuites && disabledSuites.length > 0) {
    for (const suiteName of disabledSuites) {
      disabledSuitesMap[suiteName] = true;
    }
  }
  return disabledSuitesMap;
}
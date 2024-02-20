function generatorsDataReceived(generators) {
  insight.sendEvent('generator', 'total-installed-generators', 'Total installed generators', generators.length);

  return {
    type: GENERATOR_INSTALLED_GENERATORS,
    generators
  };
}
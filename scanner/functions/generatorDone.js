function generatorDone() {
  insight.sendEvent('generator', 'done');
  return {
    type: GENERATOR_DONE
  };
}
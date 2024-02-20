function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      perf.mark(`vue-${type}-${instance.uid}`);
    }
    {
      devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
    }
  }
function withCallbackPerfMeasurements(markName, callback, onComplete) {
  const start = now();

  if (__PERFORMANCE_PROFILE__) {
    mark(markName);
  }

  const done = () => {
    if (__PERFORMANCE_PROFILE__) {
      measure(markName);
    }

    if (onComplete != null) {
      const duration = now() - start;
      onComplete(duration);
    }
  };

  return callback(done);
}
function scheduleOnce(...args) {
  // @ts-expect-error TS doesn't like the rest args here
  return _backburner.scheduleOnce(...args);
}
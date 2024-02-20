function shouldCheckEngines(engines, ignoreEngines) {
  return !ignoreEngines && typeof engines === 'object';
}
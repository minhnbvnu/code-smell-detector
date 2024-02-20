function lookAheadTimesliceAccessor(timeslice) {
  if (timeslice && timeslice.length) {
    return timeslice[0].timestamp;
  }

  log.warn('Missing entry or timestamp in lookAhead array')();
  return 0;
}
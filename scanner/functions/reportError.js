function reportError(e) {
  // TODO refactor
  var _ref = global,
      AliMonitor = _ref.AliMonitor;

  if (AliMonitor) {
    AliMonitor.reportError(typeof e === 'string' ? new Error(e) : e);
  }
}
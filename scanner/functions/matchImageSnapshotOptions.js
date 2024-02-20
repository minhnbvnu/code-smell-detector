function matchImageSnapshotOptions() {
  return (options = {}) => {
    snapshotOptions = options;
    snapshotRunning = true;
    return null;
  };
}
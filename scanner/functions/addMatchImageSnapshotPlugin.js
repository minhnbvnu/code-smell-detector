function addMatchImageSnapshotPlugin(on, config) {
  on('task', {
    [MATCH]: matchImageSnapshotOptions(config),
    [RECORD]: matchImageSnapshotResult(config),
  });
  on('after:screenshot', matchImageSnapshotPlugin);
}
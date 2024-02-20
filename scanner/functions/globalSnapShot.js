async function globalSnapShot() {
  if (globalSnapshotId) {
    await revertSnapshot(web3, globalSnapshotId);
  }
  globalSnapshotId = await takeSnapshot(web3);
}
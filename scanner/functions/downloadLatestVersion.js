function downloadLatestVersion(id) {
  return getLatestVersion(id)
  .then(latest => {
    return downloadCrx(id, latest);
  });
}
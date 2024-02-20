function isDownloadActive() {
  return !Array.from(downloadStreams.values()).includes(true);
}
function resolveDownloadPath(platform, buildId) {
  return [buildId, getArhType(platform), `chromedriver-${getArhType(platform)}.zip`];
}
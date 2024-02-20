function parseStreamTimeSeries(seriesArray, streamBlackList) {
  const {currentMajorVersion} = getXVIZConfig();

  if (currentMajorVersion === 2) {
    return parseStreamTimeSeriesV2(seriesArray, streamBlackList);
  }

  log.error(`Invalid time_series data in XVIZ version ${currentMajorVersion}`)();
  return null;
}
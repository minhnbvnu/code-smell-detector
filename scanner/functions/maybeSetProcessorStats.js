function maybeSetProcessorStats(processorStats, systemInfo) {
  if (processorStats) {
    systemInfo.packages = processorStats.packages
    systemInfo.logicalProcessors = processorStats.logical
    systemInfo.cores = processorStats.cores
  }
}
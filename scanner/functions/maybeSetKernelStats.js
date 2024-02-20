function maybeSetKernelStats(kernelStats, systemInfo) {
  if (kernelStats) {
    systemInfo.kernelVersion = kernelStats
  }
}
function maybeSetMemoryStats(memoryStats, systemInfo) {
  if (memoryStats) {
    systemInfo.memory = memoryStats
  }
}
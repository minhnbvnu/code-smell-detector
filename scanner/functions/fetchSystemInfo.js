async function fetchSystemInfo(agent, callback) {
  const utilizationConfig = Object.create(null)
  const systemInfo = {
    processorArch: os.arch()
  }

  const processorConfig = agent.config.utilization?.logical_processors
  if (processorConfig) {
    maybeAddProcessorUtilization(processorConfig, utilizationConfig)
  }

  const ramConfig = agent.config.utilization?.total_ram_mib
  if (ramConfig) {
    maybeAddRamUtilization(ramConfig, utilizationConfig)
  }

  const configHostname = agent.config.utilization?.billing_hostname
  if (configHostname) {
    maybeAddHostUtilization(configHostname, utilizationConfig)
  }

  if (Object.keys(utilizationConfig).length > 0) {
    systemInfo.config = utilizationConfig
  }

  const processorStats = await module.exports._getProcessorStats()
  const memoryStats = await module.exports._getMemoryStats()
  const kernelStats = await getKernelVersion()
  const vendorStats = await getVendors(agent)
  const bootId = await getBootId(agent)

  maybeSetProcessorStats(processorStats, systemInfo)
  maybeSetMemoryStats(memoryStats, systemInfo)
  maybeSetKernelStats(kernelStats, systemInfo)
  maybeSetVendorStats(vendorStats, systemInfo)
  maybeSetBootId(bootId, systemInfo)

  callback(null, systemInfo)
}
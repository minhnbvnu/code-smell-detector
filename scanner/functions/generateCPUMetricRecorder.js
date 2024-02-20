function generateCPUMetricRecorder(agent) {
  let lastSampleTime
  // userTime and sysTime are in seconds
  return function recordCPUMetrics(userTime, sysTime) {
    let elapsedUptime
    if (!lastSampleTime) {
      elapsedUptime = process.uptime()
    } else {
      elapsedUptime = (Date.now() - lastSampleTime) / MILLIS
    }

    const totalCpuTime = CPUS * elapsedUptime

    lastSampleTime = Date.now()

    const userUtil = userTime / totalCpuTime
    const sysUtil = sysTime / totalCpuTime

    recordValue(agent, NAMES.CPU.USER_TIME, userTime)
    recordValue(agent, NAMES.CPU.SYSTEM_TIME, sysTime)
    recordValue(agent, NAMES.CPU.USER_UTILIZATION, userUtil)
    recordValue(agent, NAMES.CPU.SYSTEM_UTILIZATION, sysUtil)
  }
}
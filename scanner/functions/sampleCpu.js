function sampleCpu(agent) {
  let lastSample
  const recordCPU = generateCPUMetricRecorder(agent)
  return function cpuSampler() {
    const cpuSample = getCpuSample(lastSample)
    lastSample = getCpuSample()

    if (lastSample == null) {
      return
    }

    recordCPU(cpuSample.user / MICROS, cpuSample.system / MICROS)
  }
}
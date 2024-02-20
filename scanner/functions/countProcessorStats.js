function countProcessorStats(processors) {
  const phys = []
  const cores = []

  for (let i = 0; i < processors.length; i++) {
    const processor = processors[i]
    if (
      processor[PHYSICAL_ID] &&
      processor[CPU_CORES] &&
      phys.indexOf(processor[PHYSICAL_ID]) === -1
    ) {
      phys.push(processor[PHYSICAL_ID])
      cores.push(processor[CPU_CORES])
    }
  }

  return {
    logical: processors.length,
    cores: cores
      .map(function convertToInt(s) {
        return parseInt(s, 10)
      })
      .reduce(function sum(a, b) {
        return a + b
      }, 0),
    packages: phys.length
  }
}
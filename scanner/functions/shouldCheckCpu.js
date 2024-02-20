function shouldCheckCpu(cpu, ignorePlatform) {
  return !ignorePlatform && Array.isArray(cpu) && cpu.length > 0;
}
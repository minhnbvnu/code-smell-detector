function importFromOldV8CPUProfile(content) {
  return importFromChromeCPUProfile(v8cpuFormatter_1.chromeTreeToNodes(content));
}
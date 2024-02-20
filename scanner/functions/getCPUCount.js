async function getCPUCount() {
  if (!cpu.count) {
    cpu.count =
      window.navigator.hardwareConcurrency || (await sample([], 10, 16));
  }
  return cpu.count;
}
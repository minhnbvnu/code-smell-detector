function restoreProcess() {
  for (const key in realProcessProps) {
    process[key] = realProcessProps[key];
  }
}
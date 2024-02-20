function recentlyKilledInternalProcess() {
  return Date.now() - lastKill < 5000;
}
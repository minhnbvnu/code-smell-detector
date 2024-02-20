function forceKill(signal) {
    Object.values(cluster.workers).forEach(w => w.kill(signal))
    process.exit()
  }
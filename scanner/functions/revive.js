function revive() {
    if (!running) return
    if (Date.now() >= reviveUntil) return
    cluster.fork()
  }
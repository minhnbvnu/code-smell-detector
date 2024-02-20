function fork(n) {
  for (var i = 0; i < n; i++) {
    cluster.fork()
  }
}
function startProc(env) {
  return cp.fork(path.join(helpersDir, 'exceptions.js'), {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    env: env
  })
}
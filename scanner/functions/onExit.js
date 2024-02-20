function onExit(exitCode) {
  console.log('Shutting down http-server...')
  httpServer.close(function(err) {
    if(err) console.warn('HTTP server close failed: %s', err)
    else console.log('HTTP server closed.')
  })

  if (!Swarm.host) {
    console.log('Swarm host not created yet...')
    return process.exit(exitCode)
  }

  console.log('Closing swarm host...')
  let forcedExit = setTimeout(function() {
    console.log('Swarm host close timeout, forcing exit.')
    process.exit(exitCode)
  }, 5000)

  Swarm.host.close(function() {
    console.log('Swarm host closed.')
    clearTimeout(forcedExit)
    process.exit(exitCode)
  })
}
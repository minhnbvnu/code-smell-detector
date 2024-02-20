function startService (service, callback) {
  try {
    const socket = new remixd.Websocket(ports[service], { remixIdeUrl }, () => services[service]())
    socket.start(callback)
  } catch (e) {
    console.error(e)
  }
}
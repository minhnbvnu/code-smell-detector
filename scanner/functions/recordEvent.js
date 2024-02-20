function recordEvent (name) {
  winston.debug('Recording smwv3 event', { name: name })
  request(EVENT_URL + '?name=' + smwv3Event(name))
}
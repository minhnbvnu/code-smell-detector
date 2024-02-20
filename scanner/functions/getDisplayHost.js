function getDisplayHost() {
  let _displayHost
  this.getDisplayHost = function getCachedDisplayHost() {
    return _displayHost
  }
  if (this.process_host.display_name === '') {
    _displayHost = this.getHostnameSafe()
    return _displayHost
  }
  const stringBuffer = Buffer.from(this.process_host.display_name, 'utf8')
  const numBytes = stringBuffer.length

  if (numBytes > 255) {
    logger.warn('Custom host display name must be less than 255 bytes')
    _displayHost = this.getHostnameSafe()
    return _displayHost
  }

  _displayHost = this.process_host.display_name
  return _displayHost
}
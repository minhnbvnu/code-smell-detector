function getHostnameSafe() {
  let _hostname
  const config = this
  this.getHostnameSafe = function getCachedHostname() {
    return _hostname
  }
  try {
    if (config.heroku.use_dyno_names) {
      const dynoName = process.env.DYNO
      _hostname = dynoName || os.hostname()
    } else {
      _hostname = os.hostname()
    }
    return _hostname
  } catch (e) {
    const addresses = this.getIPAddresses()

    if (this.process_host.ipv_preference === '6' && addresses.ipv6) {
      _hostname = addresses.ipv6
    } else if (addresses.ipv4) {
      logger.info('Defaulting to ipv4 address for host name')
      _hostname = addresses.ipv4
    } else if (addresses.ipv6) {
      logger.info('Defaulting to ipv6 address for host name')
      _hostname = addresses.ipv6
    } else {
      logger.info('No hostname, ipv4, or ipv6 address found for machine')
      _hostname = 'UNKNOWN_BOX'
    }

    return _hostname
  }
}
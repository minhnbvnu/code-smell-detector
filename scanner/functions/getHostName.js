function getHostName(agent) {
  const host = semver.satisfies(mongoPackage.version, '>=4.2.0')
    ? params.mongodb_v4_host
    : params.mongodb_host
  return urltils.isLocalhost(host) ? agent.config.getHostnameSafe() : host
}
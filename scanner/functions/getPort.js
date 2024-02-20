function getPort() {
  return semver.satisfies(mongoPackage.version, '>=4.2.0')
    ? String(params.mongodb_v4_port)
    : String(params.mongodb_port)
}
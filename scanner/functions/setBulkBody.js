function setBulkBody(body, version) {
  if (semver.lt(version, '8.0.0')) {
    return {
      refresh: true,
      body
    }
  }
  return {
    refresh: true,
    operations: body
  }
}
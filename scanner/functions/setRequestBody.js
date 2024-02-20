function setRequestBody(body, version) {
  if (semver.lt(version, '8.0.0')) {
    return { body }
  }
  return body
}
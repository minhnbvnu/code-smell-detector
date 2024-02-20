function tryGetVersion(shim) {
  // Indicates it is a built-in where the version is not useful as
  // it is `process.version`
  if (shim._moduleRoot === '.') {
    return
  }

  return shim.pkgVersion
}
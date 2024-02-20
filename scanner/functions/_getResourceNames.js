function _getResourceNames (rawArchive) {
  let names = Object.keys(rawArchive.resources)
  names.sort()
  return names
}
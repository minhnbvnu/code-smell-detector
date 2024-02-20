function isScm (version) {
  var scmPrefixes = ['git:', 'git+ssh:', 'https:', 'git+https:']
  var blacklisted = scmPrefixes.filter(function (prefix) {
    return version.indexOf(prefix) === 0
  })
  return !!blacklisted.length
}
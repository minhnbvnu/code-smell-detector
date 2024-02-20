function fetchVersion(name) {
  const DEFAULT_VERSION = 'latest'
  if (versionCache[name]) {
    if (versionCache[name].resolved) {
      return versionCache[name].version
    } else {
      return DEFAULT_VERSION
    }
  } else {
    const promise = fetch(`https://unpkg.com/${name}/package.json`)
      .then(res => res.json())
      .then(r => {
        versionCache[name].version = '^' + r.version
        versionCache[name].resolved = true
        return '^' + r.version
      })
      .catch(err => {
        versionCache[name].error = true
      })
    versionCache[name] = {
      resolved: false,
      version: 'latest',
      promise,
    }
    return DEFAULT_VERSION
  }
}
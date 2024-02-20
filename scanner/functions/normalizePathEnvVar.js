function normalizePathEnvVar (nodePath) {
  if (!nodePath) {
    return {
      win32: nodePath,
      posix: nodePath
    }
  }
  let split = (typeof nodePath === 'string' ? nodePath.split(path.delimiter) : Array.from(nodePath))
  let result = {}
  for (let i = 0; i < split.length; i++) {
    const win32 = split[i].split('/').join('\\')
    const posix = isWindows() ? split[i].split('\\').join('/').replace(/^([^:\\/]*):/, (_, $1) => `/mnt/${$1.toLowerCase()}`) : split[i]

    result.win32 = result.win32 ? `${result.win32};${win32}` : win32
    result.posix = result.posix ? `${result.posix}:${posix}` : posix

    result[i] = {win32, posix}
  }
  return result
}
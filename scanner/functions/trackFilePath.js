function trackFilePath (fpath, depPath, opts) {
  var depFilePath = ''
  if (depPath.indexOf('APP_ROOT') >= 0) {
    depFilePath = depPath.replace('APP_ROOT', '')
    depFilePath = path.join(opts.appPath, depFilePath)
  } else if (depPath.indexOf('MOD_ROOT') >= 0) {
    depFilePath = depPath.replace('MOD_ROOT', '')
    depFilePath = path.join(opts.modulePath, depFilePath)
  } else if (depPath.indexOf('WIDGET') >= 0) {
    depFilePath = depPath.replace('WIDGET', '')
    depFilePath = path.join(opts.modulePath, 'widget', depFilePath)
  } else if (depPath.indexOf('STATIC') >= 0) {
    depFilePath = depPath.replace('STATIC', '')
    depFilePath = path.join(opts.modulePath, 'static', depFilePath)
  } else if (depPath[0] === '.' || depPath[0] === '/') {
    if (fpath.indexOf('dist') >= 0) {
      fpath = fpath.replace(path.join('dist', '_static'), '')
    }
    depFilePath = path.resolve(fpath, '..', depPath)
  }
  var extname = path.extname(depFilePath)
  if (!extname) {
    depFilePath += '.js'
  }
  return depFilePath
}
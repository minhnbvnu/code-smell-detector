function hasRenderer (resolvedPath) {
  return fs.existsSync(resolve(resolvedPath, 'render.js'))
}
function getPathInHostNodeModules (module) {
  const modulePath = findUp.sync(`node_modules/${module}`, {
    type: 'directory'
  })

  if (modulePath) {
    return modulePath
  }

  const result = findUp.sync(`node_modules/${module}`, {
    cwd: path.join(__dirname, 'vendor'),
    type: 'directory'
  })

  if (result) {
    return result
  }

  throw new Error(`Module not found: ${module}`)
}
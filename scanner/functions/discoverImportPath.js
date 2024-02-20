function discoverImportPath (importPath) {
  const potentialPaths = [importPath]
  const potentialFileExtensions = ['scss', 'sass']

  if (!path.extname(importPath)) {
    potentialFileExtensions.forEach(extension => potentialPaths.push(`${importPath}.${extension}`))
  }
  if (path.basename(importPath)[0] !== '_') {
    [].concat(potentialPaths).forEach(potentialPath => potentialPaths.push(`${path.dirname(potentialPath)}/_${path.basename(potentialPath)}`))
  }

  for (let i = 0, potentialPath = potentialPaths[i]; i < potentialPaths.length; i++, potentialPath = potentialPaths[i]) {
    if (fs.existsSync(potentialPaths[i]) && fs.lstatSync(potentialPaths[i]).isFile()) {
      return potentialPath
    }
  }

  return null
}
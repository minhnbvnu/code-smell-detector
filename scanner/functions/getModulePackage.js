function getModulePackage(fullPath) {
  const dirPath = path.dirname(fullPath)
  const subPath = dirPath.match(/^\.\/src\/(.+)$/)[1]
  const esmRelativePath = path.relative(dirPath, `./src/esm/${subPath}/index.js`)
  return { module: esmRelativePath }
}
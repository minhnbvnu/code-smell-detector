function writePackage(fullPath) {
  const dirPath = path.dirname(fullPath)
  const typingsRelativePath = path.relative(dirPath, `./src/typings.d.ts`)
  const packagePath = path.resolve(rootPath, `${dirPath.replace('./src/', './')}/package.json`)
  const isESM = packagePath.includes('esm')

  return writeFile(
    packagePath,
    JSON.stringify(
      Object.assign(
        {
          sideEffects: false,
          type: isESM ? 'module' : 'commonjs',
        },
        initialPackages[fullPath] || {},
        {
          typings: typingsRelativePath,
        }
      ),
      null,
      2
    )
  )
}
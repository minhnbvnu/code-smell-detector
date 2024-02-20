async function generatePackageJson(name) {
  const packageUrl = new URL(name + '/', packagesUrl)
  const folderPath = relative(
    fileURLToPath(new URL('../', packagesUrl)),
    fileURLToPath(packageUrl)
  )

  const [files, file, commitResult] = await Promise.all([
    findDownAll(['.js', '.map', '.ts'], fileURLToPath(packageUrl)),
    read(new URL('package.json', packageUrl)),
    exec('git log --all --format="%cN <%cE>" "' + folderPath + '"')
  ])

  const codePaths = files.map(function (file) {
    return relative(fileURLToPath(packageUrl), file.path)
  })

  /** @type {PackageJson} */
  const previousPackage = JSON.parse(String(file))
  assert(ancestorPackage.author)

  const gitContributors = [...new Set(commitResult.stdout.split('\n'))]
    .sort()
    .filter(Boolean)
    .filter(function (d) {
      return !d.includes('<noreply')
    })

  // @ts-expect-error: `type-fest` has bugs.
  /** @satisfies {Partial<PackageJson>} */
  const packageJson = {
    name,
    version: previousPackage.version,
    description: previousPackage.description,
    license: ancestorPackage.license,
    keywords: (previousPackage.keywords || []).sort(),
    repository: ancestorPackage.repository + '/tree/main/' + folderPath,
    bugs: ancestorPackage.bugs,
    funding: ancestorPackage.funding,
    author: ancestorPackage.author,
    contributors:
      gitContributors.length > 0 ? gitContributors : [ancestorPackage.author],
    sideEffects: false,
    type: 'module',
    exports: './index.js',
    files: codePaths
      .map((d) => {
        const index = d.indexOf(sep)
        return index === -1 ? d : d.slice(0, index + 1)
      })
      .filter(function (d, index, all) {
        return all.indexOf(d) === index
      })
      .sort(),
    dependencies: previousPackage.dependencies,
    scripts: {},
    typeCoverage: {
      atLeast: 100,
      detail: true,
      ignoreCatch: true,
      strict: true
    },
    xo: previousPackage.xo || {
      prettier: true,
      rules: {'capitalized-comments': 'off'}
    }
  }

  file.value = JSON.stringify(packageJson, undefined, 2) + '\n'
  file.data.changed = true

  return file
}
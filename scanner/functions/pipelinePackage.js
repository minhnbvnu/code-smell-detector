async function pipelinePackage(name) {
  const [[types, dtsFile], packageFile] = await Promise.all([
    readIndexDts(name),
    generatePackageJson(name)
  ])

  /** @type {PackageJson} */
  const packageJson = JSON.parse(String(packageFile))

  /** @type {Author | undefined} */
  let author

  if (typeof packageJson.author === 'string') {
    author = parseAuthor(packageJson.author)
  } else {
    packageFile.message('Expected `author` in local `package.json` as a string')
  }

  assert(author)

  const remote = ancestorPackage.repository
  assert(remote, 'expected `remote` set in monorepo `package.json`')
  assert(
    typeof remote === 'string',
    'expected `remote` as string in monorepo `package.json`'
  )

  const pluginInfo = plugins.find((d) => d.name === name)

  /** @type {State} */
  const state = {
    author,
    id: name.replace(/-([a-z])/g, function (_, /** @type {string} */ $1) {
      return $1.toUpperCase()
    }),
    license: packageJson.license || 'MIT',
    name,
    origin:
      pluginInfo && pluginInfo.ruleId
        ? 'remark-lint:' + pluginInfo.ruleId
        : undefined,
    remote,
    types,
    urls: new Map(),
    versionMajor: (packageJson.version || '0').split('.')[0]
  }

  return [
    dtsFile,
    packageFile,
    generateNmrc(state),
    ...(await generateReadme(state))
  ]
}
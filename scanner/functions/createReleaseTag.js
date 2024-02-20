async function createReleaseTag() {
  // Parse commandline options inputs
  program.parse()

  const options = program.opts()

  console.log('Script running with following options: ', JSON.stringify(options))

  const branch = options.branch.replace('refs/heads/', '')
  const [owner, repo] = options.repo.split('/')
  const workflows = options.workflows.split(',')

  if (options.force) {
    console.log('--force set. Skipping validation logic')
  }

  try {
    const isValid =
      options.force ||
      ((await validateLocalChanges()) &&
        (await validateCurrentBranch(branch)) &&
        (await checkWorkflowRun(owner, repo, branch, workflows)))

    if (!isValid) {
      process.exit(1)
    }

    const packagePath = `${process.cwd()}/package.json`
    console.log(`Extracting new version from ${packagePath}`)
    const packageInfo = require(packagePath)

    const version = `v${packageInfo.version}`
    console.log('New version is: ', version)

    console.log('Creating and pushing tag')

    await git.createAnnotatedTag(version, version)
    await git.pushTags()

    console.log('*** Full Run Successful ***')
  } catch (err) {
    console.log(err)

    process.exit(1)
  }
}
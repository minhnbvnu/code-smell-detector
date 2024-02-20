async function prepareReleaseNotes() {
  // Parse commandline options inputs
  program.parse()
  const options = program.opts()
  console.log('Script running with following options: ', JSON.stringify(options))
  const [owner, repo] = options.repo.split('/')

  logStep('Validation')

  if (!(await isValid(options))) {
    console.log('Invalid configuration. Halting script.')
    stopOnError()
  }

  const remote = options.remote || FORCE_RUN_DEAFULT_REMOTE
  console.log('Using remote: ', remote)

  try {
    logStep('Increment Version')

    await npm.version(options.releaseType, false)

    const packagePath = `${process.cwd()}/package.json`
    console.log(`Extracting new version from ${packagePath}`)
    const packageInfo = require(packagePath)

    const version = `v${packageInfo.version}`
    console.log('New version is: ', version)

    logStep('Branch Creation')

    const newBranchName = `release/${version}`

    if (options.dryRun) {
      console.log('Dry run indicated (--dry-run), not creating branch.')
    } else {
      console.log('Creating and checking out new branch: ', newBranchName)
      await git.checkoutNewBranch(newBranchName)
    }

    logStep('Commit Package Files')

    if (options.dryRun) {
      console.log('Dry run indicated (--dry-run), not committing package files.')
    } else {
      console.log('Adding and committing package files.')
      await git.addAllFiles()
      await git.commit(`Setting version to ${version}.`)
    }

    let releaseData
    if (options.useNewRelease) {
      logStep('Create Release Notes - Conventional Commit based')
      const [markdown] = await generateConventionalReleaseNotes(
        owner,
        repo,
        packageInfo.version,
        options.changelog
      )
      releaseData = markdown
    } else {
      logStep('Create Release Notes')
      releaseData = await generateReleaseNotes(owner, repo)
      await updateReleaseNotesFile(options.changelog, version, releaseData.notes)
    }

    if (options.dryRun) {
      console.log('\nDry run indicated (--dry-run), skipping remaining steps.')
      return
    }

    logStep('Commit Release Notes')

    console.log('Adding and committing release notes.')
    await git.addAllFiles()
    await git.commit('Adds auto-generated release notes.')

    logStep('Push Branch')

    console.log('Pushing branch to remote: ', remote)
    await git.pushToRemote(remote, newBranchName)

    logStep('Create Pull Request')
    if (!options.pr) {
      console.log('No PR creation indicated (--no-pr), skipping remaining steps.')
      return
    }

    if (!process.env.GITHUB_TOKEN) {
      console.log('GITHUB_TOKEN required to create a pull request (PR)')
      stopOnError()
    }

    console.log('Creating draft PR with new release notes for repo owner: ', owner)
    const remoteApi = new Github(owner, repo)

    let title
    let body

    if (options.useNewRelease) {
      title = `chore: release ${version}`
      body = releaseData
    } else {
      title = `Release ${version}`
      body = getFormattedPrBody(releaseData)
    }

    const prOptions = {
      head: newBranchName,
      base: 'main',
      title,
      body,
      draft: true
    }

    await remoteApi.createPR(prOptions)

    console.log('*** Full Run Successful ***')
  } catch (err) {
    stopOnError(err)
  }
}
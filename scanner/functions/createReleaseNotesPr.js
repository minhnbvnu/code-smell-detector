async function createReleaseNotesPr() {
  // Parse commandline options inputs
  program.parse()

  const options = program.opts()

  console.log(`Script running with following options: ${JSON.stringify(options)}`)

  GITHUB_USER = options.username || process.env.GITHUB_USER || process.env.GITHUB_ACTOR
  GITHUB_EMAIL = options.email || process.env.GITHUB_EMAIL || `gh-actions-${GITHUB_USER}@github.com`
  const repoOwner = options.repoOwner

  try {
    const version = options.tag.replace('refs/tags/', '')
    console.log(`Getting version from tag: ${version}`)

    logStep('Validation')
    validateTag(version, options.force)
    logStep('Get Release Notes from File')
    const { body, releaseDate } = await getReleaseNotes(version, options.changelog)
    const frontmatter = await getFrontMatter(version, options.frontMatterFile)

    if (!fs.existsSync(options.repoPath)) {
      logStep('Clone docs repo')
      await cloneDocsRepo(options.repoPath, repoOwner)
    }

    logStep('Branch Creation')
    const branchName = await createBranch(options.repoPath, version, options.dryRun)
    logStep('Format release notes file')
    const releaseNotesBody = formatReleaseNotes(releaseDate, version, body, frontmatter)
    logStep('Create Release Notes')
    await addReleaseNotesFile(releaseNotesBody, version)
    logStep('Commit Release Notes')
    await commitReleaseNotes(version, options.remote, branchName, options.dryRun)
    logStep('Create Pull Request')
    await createPR(version, branchName, options.dryRun, repoOwner)
    console.log('*** Full Run Successful ***')
  } catch (err) {
    if (err.status && err.status === 404) {
      console.log('404 status error detected. For octokit, this may mean insufficient permissions.')
      console.log('Ensure you have a valid GITHUB_TOKEN set in your env vars.')
    }

    stopOnError(err)
  } finally {
    process.chdir('..')
  }
}
async function createPR(version, branch, dryRun, repoOwner) {
  if (!process.env.GITHUB_TOKEN) {
    console.log('GITHUB_TOKEN required to create a pull request')
    stopOnError()
  }

  const github = new Github(repoOwner, 'docs-website')
  const title = `chore: add Node.js Agent ${version} Release Notes`
  const head = repoOwner === `newrelic` ? branch : `${repoOwner}:${branch}`
  const body =
    'This is an automated PR generated when the Node.js agent is released. Please merge as soon as possible.'

  const prOptions = {
    head,
    base: BASE_BRANCH,
    title,
    body
  }

  console.log(`Creating PR with following options: ${JSON.stringify(prOptions)}\n\n`)

  if (dryRun) {
    console.log('Dry run indicated (--dry-run), skipping creating pull request.')
    return
  }

  return await github.createPR(prOptions)
}
async function generateConventionalReleaseNotes(owner, repo, newVersion, markdownChangelog) {
  const github = new Github(owner, repo)
  const latestRelease = await github.getLatestRelease()

  const changelog = new ConventionalChangelog({
    org: owner,
    repo,
    newVersion,
    previousVersion: latestRelease.tag_name.replace('v', '')
  })

  const commits = await changelog.getFormattedCommits()

  const [markdown, json] = await Promise.all([
    changelog.generateMarkdownChangelog(commits),
    changelog.generateJsonChangelog(commits)
  ])

  await Promise.all([
    changelog.writeMarkdownChangelog(markdown, markdownChangelog),
    changelog.writeJsonChangelog(json)
  ])

  return [markdown, json]
}
async function findMergedPRs(repo, ignoredLabels) {
  const github = new Github('newrelic', repo)
  const latestRelease = await github.getLatestRelease()
  console.log(
    `The latest release for ${repo} is: ${latestRelease.name} published: ${latestRelease.published_at}`
  )
  console.log(`Tag: ${latestRelease.tag_name}, Target: ${latestRelease.target_commitish}`)

  const tag = await github.getTagByName(latestRelease.tag_name)
  console.log('The tag commit sha is: ', tag.commit.sha)

  const commit = await github.getCommit(tag.commit.sha)
  const commitDate = commit.commit.committer.date

  console.log(`Finding merged pull requests since: ${commitDate}`)

  const mergedPullRequests = await github.getMergedPullRequestsSince(commitDate)

  const filteredPullRequests = mergedPullRequests.filter((pr) => {
    // Find all PRs without an ignored label
    const withIngored = pr.labels.some(({ name }) => ignoredLabels.includes(name))

    // Sometimes the commit for the PR the tag is set to has an earlier time than
    // the PR merge time and we'll pull in release note PRs. Filters those out.
    return pr.merge_commit_sha !== tag.commit.sha && !withIngored
  })

  console.log(`Found ${filteredPullRequests.length} PRs not yet released.`)
  const prs = filteredPullRequests.map((pr) => pr.html_url)
  return {
    prs,
    latestRelease
  }
}
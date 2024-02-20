async function generateReleaseNotes(owner, repo) {
  const github = new Github(owner, repo)
  const latestRelease = await github.getLatestRelease()
  console.log(
    `The latest release is: ${latestRelease.name} published: ${latestRelease.published_at}`
  )
  console.log(`Tag: ${latestRelease.tag_name}, Target: ${latestRelease.target_commitish}`)

  const tag = await github.getTagByName(latestRelease.tag_name)
  console.log('The tag commit sha is: ', tag.commit.sha)

  const commit = await github.getCommit(tag.commit.sha)
  const commitDate = commit.commit.committer.date

  console.log(`Finding merged pull requests since: ${commitDate}`)

  const mergedPullRequests = await github.getMergedPullRequestsSince(commitDate)

  const filteredPullRequests = mergedPullRequests.filter((pr) => {
    // Sometimes the commit for the PR the tag is set to has an earlier time than
    // the PR merge time and we'll pull in release note PRs. Filters those out.

    return pr.merge_commit_sha !== tag.commit.sha
  })

  console.log(`Found ${filteredPullRequests.length}`)

  const releaseNoteData = filteredPullRequests.map((pr) => {
    const parts = pr.body.split(/(?:^|\n)##\s*/g)

    // If only has one part, not in appropriate format.
    if (parts.length === 1) {
      return {
        notes: generateUnformattedNotes(pr.body),
        url: pr.html_url
      }
    }

    const { 1: proposedReleaseNotes } = parts

    const titleRemoved = proposedReleaseNotes.replace(PROPOSED_NOTES_HEADER, '')
    return {
      notes: titleRemoved,
      url: pr.html_url
    }
  })

  return releaseNoteData.reduce(
    (result, currentValue) => {
      const trimmedNotes = currentValue.notes.trim()
      if (trimmedNotes) {
        // avoid adding lines for empty notes
        result.notes += '\n\n' + trimmedNotes
      }
      result.links += `\n* PR: ${currentValue.url}`
      return result
    },
    {
      notes: '',
      links: ''
    }
  )
}
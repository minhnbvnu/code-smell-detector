function createSlackMessage(prs, latestRelease, repo) {
  return `
    *${repo}*

  There have been ${prs.length} PRs merged since \`${latestRelease.name}\` on *${
    latestRelease.published_at
  }*.

  :waiting: *PRs not yet released*:

 - ${prs.join('\n - ')}

    Do you want to <https://github.com/newrelic/${repo}/actions/workflows/prepare-release.yml | prepare a release>?
    `
}
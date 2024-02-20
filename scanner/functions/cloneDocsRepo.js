async function cloneDocsRepo(repoPath, repoOwner) {
  const branch = 'develop'
  const url = `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${repoOwner}/docs-website.git`
  const cloneOptions = [`--branch=${branch}`, '--single-branch']

  return git.clone(url, repoPath, cloneOptions)
}
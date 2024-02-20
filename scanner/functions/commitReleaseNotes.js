async function commitReleaseNotes(version, remote, branch, dryRun) {
  if (dryRun) {
    console.log('Dry run indicated (--dry-run), skipping committing release notes.')
    return
  }

  await git.setUser(GITHUB_USER, GITHUB_EMAIL)

  console.log(`Adding release notes for ${version}`)
  const files = [getFileName(version)]
  await git.addFiles(files)
  await git.commit(`chore: Adds Node.js agent ${version} release notes.`)
  console.log(`Pushing branch to remote ${remote}`)
  await git.pushToRemote(remote, branch)
}
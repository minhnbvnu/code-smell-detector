async function pushToRemote(remote, branchName) {
  const stdout = await execAsPromise(`git push --set-upstream ${remote} ${branchName}`)
  return stdout.trim()
}
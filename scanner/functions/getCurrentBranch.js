async function getCurrentBranch() {
  const stdout = await execAsPromise('git branch --show-current')
  return stdout.trim()
}
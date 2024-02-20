async function addAllFiles() {
  const stdout = await execAsPromise(`git add . ':!${AGENT_SUB_REPO}'`)
  return stdout.trim()
}
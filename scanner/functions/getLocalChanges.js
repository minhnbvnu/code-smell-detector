async function getLocalChanges() {
  const stdout = await execAsPromise('git status --short --porcelain')
  return stdout.split('\n').filter((line) => {
    return line.length > 0 && !line.includes(AGENT_SUB_REPO || DOCS_SUB_REPO)
  })
}
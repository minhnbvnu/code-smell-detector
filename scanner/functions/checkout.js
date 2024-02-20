async function checkout(branchName) {
  const stdout = await execAsPromise(`git checkout ${branchName}`)
  return stdout.trim()
}
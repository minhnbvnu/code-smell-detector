async function checkoutNewBranch(name) {
  const stdout = await execAsPromise(`git checkout -b ${name}`)
  return stdout.trim()
}
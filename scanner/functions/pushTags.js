async function pushTags() {
  const stdout = await execAsPromise('git push --tags')
  return stdout.trim()
}
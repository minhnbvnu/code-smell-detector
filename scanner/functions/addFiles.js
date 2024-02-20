async function addFiles(files) {
  files = files.join(' ')
  const stdout = await execAsPromise(`git add ${files}`)
  return stdout.trim()
}
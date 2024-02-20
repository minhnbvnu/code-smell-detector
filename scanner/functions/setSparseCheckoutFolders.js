async function setSparseCheckoutFolders(folders) {
  const foldersString = folders.join(' ')

  const stdout = await execAsPromise(`git sparse-checkout set --no-cone ${foldersString}`)
  return stdout.trim()
}
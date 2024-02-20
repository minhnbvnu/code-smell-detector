async function sparseCloneRepo(repoInfo, checkoutFiles) {
  const { name, repository, branch } = repoInfo

  const cloneOptions = [
    '--filter=blob:none',
    '--no-checkout',
    '--depth 1',
    '--sparse',
    `--branch=${branch}`
  ]
  await clone(repository, name, cloneOptions)
  process.chdir(name)

  await setSparseCheckoutFolders(checkoutFiles)

  await checkout(branch)

  process.chdir('..')
}
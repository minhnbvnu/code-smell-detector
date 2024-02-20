async function version(typeOrVersion, shouldCommitAndTag) {
  let command = `npm version ${typeOrVersion}`

  command += shouldCommitAndTag ? '' : ' --no-git-tag-version'

  await execAsPromise(command)
}
async function getPushRemotes() {
  const stdout = await execAsPromise('git remote -v')

  const remotes = stdout.split('\n')
  return remotes.reduce((remotePairs, currentRemote) => {
    const parts = currentRemote.split('\t')
    if (parts.length < 2) {
      return remotePairs
    }

    const [name, url] = parts
    if (url.indexOf('(push)') >= 0) {
      remotePairs[name] = url
    }

    return remotePairs
  }, {})
}
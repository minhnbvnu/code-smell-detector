function parseFullName (params) {
  const { username, repo } = params
  if (!username) return DEFAULT_USER

  return username + (repo ? '/' + repo : '')
}
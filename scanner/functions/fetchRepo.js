function fetchRepo (options) {
  const { username, repo } = options

  return dispatch => {
    fetch(`${GITHUB_API}/repos/${username}/${repo}`)
    .then(processResponse)
    .then(res => dispatch({
      type: FETCH_REPO,
      repo: res
    }))
    .catch(error => handleActionError(dispatch, error, FETCH_REPO))
  }
}
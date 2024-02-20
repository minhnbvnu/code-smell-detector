function fetchRepoStargazers (options) {
  const { page, username, repo } = options
  const url = page ? page :
    `${GITHUB_API}/repos/${username}/${repo}/stargazers`

  return dispatch => {
    fetch(url)
    .then(res => {
      const pagination = parseLinkHeader(res.headers.get('link'))
      return processResponse(res)
      .then(result => dispatch({
        type: FETCH_REPO_STARGAZERS,
        stargazers: result,
        pagination
      }))
    })
    .catch(error => handleActionError(dispatch, error, FETCH_REPO_STARGAZERS))
  }
}
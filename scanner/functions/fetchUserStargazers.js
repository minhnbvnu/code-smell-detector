function fetchUserStargazers (options) {
  const { page, username } = options
  const url = page ? page :
    `${GITHUB_API}/users/${username}/starred`

  return dispatch => {
    fetch(url)
    .then(res => {
      const pagination = parseLinkHeader(res.headers.get('link'))
      return processResponse(res)
      .then(result => dispatch({
        type: FETCH_USER_STARGAZERS,
        stargazers: result,
        pagination
      }))
    })
    .catch(error => handleActionError(dispatch, error, FETCH_USER_STARGAZERS))
  }
}
function fetchUser (options) {
  const { username } = options

  return dispatch => {
    fetch(`${GITHUB_API}/users/${username}`)
    .then(processResponse)
    .then(res => dispatch({
      type: FETCH_USER,
      user: res
    }))
    .catch(error => handleActionError(dispatch, error, FETCH_USER))
  }
}
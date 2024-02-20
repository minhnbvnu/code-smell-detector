function fetchChannels(user) {
  return dispatch => {
    dispatch(requestChannels())
    return fetch(`/api/channels/${user}`)
      .then(response => response.json())
      .then(json => dispatch(receiveChannels(json)))
      .catch(error => {throw error});
  }
}
function fetchMessages(channel) {
  return dispatch => {
    dispatch(requestMessages())
    return fetch(`/api/messages/${channel}`)
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(json, channel)))
      .catch(error => {throw error});
  }
}
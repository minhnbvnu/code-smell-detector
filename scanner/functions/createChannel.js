function createChannel(channel) {
  return dispatch => {
    return fetch('/api/channels/new_channel', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(channel)})
      .catch(error => {throw error}).then((val) =>
      {},
      () => {dispatch(addChannel(channel))})
  }
}
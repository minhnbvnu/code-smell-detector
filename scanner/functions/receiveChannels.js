function receiveChannels(json) {
  return {
    type: types.LOAD_CHANNELS_SUCCESS,
    json
  }
}
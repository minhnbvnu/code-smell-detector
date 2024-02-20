function receiveRawChannel(channel) {
  return {
    type: types.RECEIVE_CHANNEL,
    channel
  };
}
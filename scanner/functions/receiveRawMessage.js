function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}
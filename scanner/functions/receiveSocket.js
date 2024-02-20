function receiveSocket(socketID) {
  return {
    type: types.RECEIVE_SOCKET,
    socketID
  }
}
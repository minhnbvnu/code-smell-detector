function makeMessage(messageType, data) {
  return {type: `${XVIZ_MESSAGE_NAMESPACE}/${messageType}`, data};
}
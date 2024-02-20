function emitUserMessage(text) {
  return {
    type: actions.EMIT_NEW_USER_MESSAGE,
    text
  };
}
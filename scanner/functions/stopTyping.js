function stopTyping(username) {
  return {
    type: types.STOP_TYPING,
    username
  };
}
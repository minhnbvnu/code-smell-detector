function doClose(state, action) {
  return {
    messages: state.messages.filter((_, index) => index !== action.index),
  };
}
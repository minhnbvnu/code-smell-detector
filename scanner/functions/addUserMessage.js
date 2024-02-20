function addUserMessage(text, nextMessageIsTooltip = false, hidden = false) {
  return {
    type: actions.ADD_NEW_USER_MESSAGE,
    text,
    nextMessageIsTooltip,
    hidden
  };
}
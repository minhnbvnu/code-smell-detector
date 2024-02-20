function createNewMessage(text, sender, nextMessageIsTooltip, hidden) {
  return Map({
    type: MESSAGES_TYPES.TEXT,
    component: Message,
    text,
    sender,
    showAvatar: sender === MESSAGE_SENDER.RESPONSE,
    timestamp: new Date().getTime(),
    nextMessageIsTooltip,
    hidden
  });
}
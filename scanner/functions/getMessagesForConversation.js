function getMessagesForConversation (messages, parentMessageId) {
  const orderedMessages = []
  let currentMessageId = parentMessageId
  while (currentMessageId) {
    const message = messages.find((m) => m.id === currentMessageId)
    if (!message) {
      break
    }
    orderedMessages.unshift(message)
    currentMessageId = message.parentMessageId
  }

  return orderedMessages
}
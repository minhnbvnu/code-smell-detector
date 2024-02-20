async function getLatestMessageIdByConversationId (conversationId, fetchFn = fetch) {
  let accessToken = await redis.get('CHATGPT:TOKEN')
  if (!accessToken) {
    throw new Error('未绑定ChatGPT AccessToken，请使用#chatgpt设置token命令绑定token')
  }
  let conversationDetailResponse = await fetchFn(`${Config.apiBaseUrl}/conversation/${conversationId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  })
  let conversationDetail = await conversationDetailResponse.text()
  if (Config.debug) {
    logger.mark('conversation detail for conversation ' + conversationId, conversationDetail)
  }
  conversationDetail = JSON.parse(conversationDetail).body
  let messages = Object.values(conversationDetail.mapping)
  messages = messages
    .filter(message => message.message)
    .map(messages => messages.message)
    .filter(messages => messages.author.role === 'assistant')
    .sort((a, b) => b.create_time - a.create_time)
  await redis.set(`CHATGPT:CONVERSATION_LAST_MESSAGE_ID:${conversationId}`, messages[0].id)
  return messages[0].id
}
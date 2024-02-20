async function deleteConversation (conversationId, fetchFn = fetch) {
  let accessToken = await redis.get('CHATGPT:TOKEN')
  if (!accessToken) {
    throw new Error('未绑定ChatGPT AccessToken，请使用#chatgpt设置token命令绑定token')
  }
  let response = await fetchFn(`${Config.apiBaseUrl}/conversation/${conversationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify({ is_visible: false })
  })
  let responseText = await response.text()
  return JSON.parse(responseText)
}
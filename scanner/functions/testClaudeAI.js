async function testClaudeAI () {
  let client = new ClaudeAIClient({
    organizationId: '',
    sessionKey: '',
    debug: true,
    proxy: 'http://127.0.0.1:7890'
  })
  let conv = await client.createConversation()
  let result = await client.sendMessage('hello, who are you', conv.uuid)
  console.log(result.text)
  return result
}
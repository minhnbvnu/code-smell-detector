function assertChatCompletionMessages({ tx, chatMsgs, id, model, reqContent, resContent }) {
  const baseMsg = {
    'appName': 'New Relic for Node.js tests',
    'request_id': '49dbbffbd3c3f4612aa48def69059aad',
    'trace_id': tx.traceId,
    'span_id': tx.trace.root.children[0].id,
    'transaction_id': tx.id,
    'response.model': model,
    'vendor': 'openAI',
    'ingest_source': 'Node',
    'role': 'user',
    'is_response': false,
    'completion_id': /[a-f0-9]{36}/
  }

  chatMsgs.forEach((msg) => {
    const expectedChatMsg = { ...baseMsg }
    if (msg[1].sequence === 0) {
      expectedChatMsg.sequence = 0
      expectedChatMsg.id = `${id}-0`
      expectedChatMsg.content = reqContent
    } else if (msg[1].sequence === 1) {
      expectedChatMsg.sequence = 1
      expectedChatMsg.id = `${id}-1`
      expectedChatMsg.content = 'What does 1 plus 1 equal?'
    } else {
      expectedChatMsg.sequence = 2
      expectedChatMsg.role = 'assistant'
      expectedChatMsg.id = `${id}-2`
      expectedChatMsg.content = resContent
      expectedChatMsg.is_response = true
    }

    this.equal(msg[0].type, 'LlmChatCompletionMessage')
    this.match(msg[1], expectedChatMsg, 'should match chat completion message')
  })
}
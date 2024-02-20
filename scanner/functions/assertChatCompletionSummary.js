function assertChatCompletionSummary({ tx, model, chatSummary, tokenUsage, error = false }) {
  let expectedChatSummary = {
    'id': /[a-f0-9]{36}/,
    'appName': 'New Relic for Node.js tests',
    'request_id': '49dbbffbd3c3f4612aa48def69059aad',
    'trace_id': tx.traceId,
    'span_id': tx.trace.root.children[0].id,
    'transaction_id': tx.id,
    'response.model': model,
    'vendor': 'openAI',
    'ingest_source': 'Node',
    'request.model': model,
    'duration': tx.trace.root.children[0].getDurationInMillis(),
    'response.organization': 'new-relic-nkmd8b',
    'response.headers.llmVersion': '2020-10-01',
    'response.headers.ratelimitLimitRequests': '200',
    'response.headers.ratelimitLimitTokens': '40000',
    'response.headers.ratelimitResetTokens': '90ms',
    'response.headers.ratelimitRemainingTokens': '39940',
    'response.headers.ratelimitRemainingRequests': '199',
    'response.number_of_messages': 3,
    'response.choices.finish_reason': 'stop',
    'error': error
  }

  if (tokenUsage) {
    expectedChatSummary = {
      ...expectedChatSummary,
      'response.usage.total_tokens': 64,
      'response.usage.prompt_tokens': 53,
      'response.usage.completion_tokens': 11
    }
  }

  this.equal(chatSummary[0].type, 'LlmChatCompletionSummary')
  this.match(chatSummary[1], expectedChatSummary, 'should match chat summary message')
}
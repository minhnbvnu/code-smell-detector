function getExpectedResult(tx, event, type, completionId) {
  const trace = tx.trace.root
  let expected = {
    'id': event.id,
    'appName': 'New Relic for Node.js tests',
    'request_id': 'req-id',
    'trace_id': tx.traceId,
    'span_id': trace.children[0].id,
    'transaction_id': tx.id,
    'response.model': 'gpt-3.5-turbo-0613',
    'vendor': 'openAI',
    'ingest_source': 'Node'
  }
  const resKeys = {
    'duration': trace.children[0].getDurationInMillis(),
    'request.model': 'gpt-3.5-turbo-0613',
    'response.organization': 'new-relic',
    'response.usage.total_tokens': '100',
    'response.usage.prompt_tokens': '10',
    'response.headers.llmVersion': '1.0.0',
    'response.headers.ratelimitLimitRequests': '100',
    'response.headers.ratelimitLimitTokens': '100',
    'response.headers.ratelimitResetTokens': '100',
    'response.headers.ratelimitRemainingTokens': '10',
    'response.headers.ratelimitRemainingRequests': '10'
  }

  switch (type) {
    case 'embedding':
      expected = { ...expected, ...resKeys }
      expected.input = 'This is my test input'
      expected.error = false
      break
    case 'summary':
      expected = {
        ...expected,
        ...resKeys,
        ['request.max_tokens']: '1000000',
        ['request.temperature']: 'medium-rare',
        ['response.number_of_messages']: 3,
        ['response.usage.completion_tokens']: 10,
        ['response.choices.finish_reason']: 'stop',
        error: false
      }
      break
    case 'message':
      expected = {
        ...expected,
        content: 'What is a woodchuck?',
        role: 'inquisitive-kid',
        sequence: 0,
        completion_id: completionId,
        is_response: false
      }
  }

  return expected
}
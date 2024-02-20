function recordChatCompletionMessages({ agent, segment, request, response, err }) {
  if (!response) {
    // If we get an error, it is possible that `response = null`.
    // In that case, we define it to be an empty object.
    response = {}
  }

  response.headers = segment[openAiHeaders]
  const tx = segment.transaction
  // explicitly end segment to consistent duration
  // for both LLM events and the segment
  segment.end()
  const completionSummary = new LlmChatCompletionSummary({
    agent,
    segment,
    request,
    response,
    withError: err != null
  })

  // Only take the first response message and append to input messages
  const messages = [...request.messages, response?.choices?.[0]?.message]
  messages.forEach((message, index) => {
    const completionMsg = new LlmChatCompletionMessage({
      agent,
      segment,
      request,
      response,
      index,
      completionId: completionSummary.id,
      message
    })

    assignIdsToTx({ tx, completionMsg, responseId: response.id })
    recordEvent({ agent, type: 'LlmChatCompletionMessage', msg: completionMsg })
  })

  recordEvent({ agent, type: 'LlmChatCompletionSummary', msg: completionSummary })

  if (err) {
    const llmError = new LlmErrorMessage({ cause: err, summary: completionSummary, response })
    agent.errors.add(segment.transaction, err, llmError)
  }

  delete response.headers
}
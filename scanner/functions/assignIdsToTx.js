function assignIdsToTx({ tx, completionMsg, responseId }) {
  const tracker = tx.llm.responses
  const trackedIds =
    tracker.get(responseId) ??
    new LlmTrackedIds({
      requestId: completionMsg.request_id,
      conversationId: completionMsg['llm.conversation_id']
    })
  trackedIds.message_ids.push(completionMsg.id)
  tracker.set(responseId, trackedIds)
}
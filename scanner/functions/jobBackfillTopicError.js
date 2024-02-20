function jobBackfillTopicError (result) {
  return {
    type: LOAD_BACKFILL_TOPIC_ERROR,
    payload: {
      result
    }
  }
}
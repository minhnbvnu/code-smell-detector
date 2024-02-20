function jobBackfillTopicLoaded (result) {
  return {
    type: LOAD_BACKFILL_TOPIC_SUCCUSS,
    payload: {
      result
    }
  }
}
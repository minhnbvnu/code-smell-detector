function loadJobBackfillTopic (projectId, namespaceId, resolve) {
  return {
    type: LOAD_BACKFILL_TOPIC,
    payload: {
      projectId,
      namespaceId,
      resolve
    }
  }
}
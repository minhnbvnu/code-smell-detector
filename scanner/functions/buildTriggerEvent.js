function buildTriggerEvent () {
  return any.fromList([buildPushEvent(), buildRepositoryCreatedEvent(), buildRepositoryEditedEvent()])
}
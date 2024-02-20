function buildRepositoryCreatedEvent () {
  return {
    name: 'repository.created',
    payload: { repository }
  }
}
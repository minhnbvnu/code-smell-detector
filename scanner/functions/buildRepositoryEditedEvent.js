function buildRepositoryEditedEvent () {
  return {
    name: 'repository.edited',
    payload: {
      changes: { default_branch: { from: any.word() } },
      repository
    }
  }
}
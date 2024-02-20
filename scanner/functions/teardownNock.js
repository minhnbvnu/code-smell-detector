function teardownNock (githubScope) {
  expect(githubScope.pendingMocks()).toStrictEqual([])

  nock.cleanAll()
}
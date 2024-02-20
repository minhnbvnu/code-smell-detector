function addWorkingGraphQLRequestMock(scope) {
  scope.post('/admin/api/graphql.json').reply(200, {
    data: {
      shop: {
        id: 1,
        name: 'My Cool Test Shop'
      }
    }
  });
}
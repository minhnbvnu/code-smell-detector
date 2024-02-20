function addWorkingRESTRequestMock(scope) {
  scope.get('/admin/shop.json').reply(200, {
    shop: {
      id: 1,
      name: 'My Cool Test Shop'
    }
  });
}
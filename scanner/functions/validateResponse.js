function validateResponse(t, error, response) {
    t.error(error, 'should not have an error')
    t.equal(response.payload, 'some-collector-url', 'should get expected response')
    t.ok(response.status, 'should get response status code')
  }
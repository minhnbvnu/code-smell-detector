function fixtureWithHeaders(fixture) {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    body: fixture
  };
}
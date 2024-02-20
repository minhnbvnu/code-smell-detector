function testWelcome(app, done, path) {
  request(app)
    .get(path)
    .expect(200)
    .then((res) => {
      if (!/Welcome!/.test(res.text)) {
        throw new Error("No 'Welcome!' in response");
      }
    })
    .then(done, done);
}
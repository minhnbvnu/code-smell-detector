function testErrorMessage(opts, message) {
  test('shows error message', done => {
    parser.parse(opts, (err, argv, output) => {
      expect(err).to.have.property('message');
      expect(err.message).to.eql(message);
      expect(output).to.include(message);
      done();
    });
  });
}
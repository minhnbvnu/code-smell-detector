function testShowsHelp(opts, description = 'shows help') {
  test(description, done => {
    parser.parse(opts, (err, argv, output) => {
      expect(output).to.include('Usage:');
      expect(output).to.include('Commands:');
      expect(output).to.include('Options:');
      done();
    });
  });
}
function checkError(err) {
    err.name.should.equal('compilation_error');
    err.message.should.contain('Expression does not eval to a function.');
  }
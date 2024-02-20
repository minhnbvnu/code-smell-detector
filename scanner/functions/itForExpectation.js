function itForExpectation (expectation, block=() => {}) {
  if(expectation.ignore) {
    it.skip(expectation.description, block);
  } else if(expectation.focus) {
    it.only(expectation.description, block);
  } else {
    it(expectation.description, block);
  }
}
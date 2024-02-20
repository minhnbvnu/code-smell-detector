function describeForTest(test, description, block) {
  if(test.ignore) {
    describe.skip(description, block);
  } else if(test.focus) {
    describe.only(description, block);
  } else {
    describe(description, block);
  }
}
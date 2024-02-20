function buildExpectation(expectation, block, root, not) {
  return () => {

    EXPECTATIONS[expectation.type] && EXPECTATIONS[expectation.type]({expectation, root, not});

    describe('', () => {
      block && block();
    })
  };
}
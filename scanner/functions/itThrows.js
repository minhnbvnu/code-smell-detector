function itThrows(desc, testFn, partialMessage) {
    it(`throws ${desc}`, () => {
      return testFn().then(
        () => expect(false).toBe('The promise resolved and should not have.'),
        err => {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toContain(partialMessage);
        },
      );
    });
  }
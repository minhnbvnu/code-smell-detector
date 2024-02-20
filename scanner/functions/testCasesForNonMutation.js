function testCasesForNonMutation(spec) {
    it('returns false', () => {
      const state = spec.getState();
      const options = spec.middlewareOptions || {};
      const { isImmutable = isImmutableDefault, ignore } = options;
      const tracker = trackForMutations(isImmutable, ignore, state);
      const newState = spec.fn(state);

      expect(
        tracker.detectMutations()
      ).toEqual({wasMutated: false});
    });
  }
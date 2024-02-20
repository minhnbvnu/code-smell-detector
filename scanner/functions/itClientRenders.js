function itClientRenders(desc, testFn) {
    it(`renders ${desc} with clean client render`, () =>
      testFn(clientCleanRender));
    it(`renders ${desc} with client render on top of good server markup`, () =>
      testFn(clientRenderOnServerString));
    it(`renders ${desc} with client render on top of bad server markup`, async () => {
      try {
        await testFn(clientRenderOnBadMarkup);
      } catch (x) {
        // We expect this to trigger the BadMarkupExpected rejection.
        if (!(x instanceof BadMarkupExpected)) {
          // If not, rethrow.
          throw x;
        }
      }
    });
  }
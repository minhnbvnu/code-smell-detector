async function expectErrors(fn, count) {
    if (console.error.calls && console.error.calls.reset) {
      console.error.calls.reset();
    } else {
      // TODO: Rewrite tests that use this helper to enumerate expected errors.
      // This will enable the helper to use the .toWarnDev() matcher instead of spying.
      spyOnDev(console, 'error');
    }

    const result = await fn();
    if (
      console.error.calls &&
      console.error.calls.count() !== count &&
      console.error.calls.count() !== 0
    ) {
      console.log(
        `We expected ${count} warning(s), but saw ${console.error.calls.count()} warning(s).`,
      );
      if (console.error.calls.count() > 0) {
        console.log(`We saw these warnings:`);
        for (let i = 0; i < console.error.calls.count(); i++) {
          console.log(...console.error.calls.argsFor(i));
        }
      }
    }
    if (__DEV__) {
      expect(console.error).toHaveBeenCalledTimes(count);
    }
    return result;
  }
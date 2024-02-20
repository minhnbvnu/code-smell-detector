function toHaveBeenCalledTimes() {
        return {
            compare(actual, expected) {
                if (!j$.isSpy(actual)) {
                    throw new Error(`Expected a spy, but got ${j$.pp(actual)}.`);
                }

                const args = Array.prototype.slice.call(arguments, 0);
                const result = { pass: false };

                if (!expected) {
                    throw new Error('Expected times failed is required as an argument.');
                }

                actual = args[0];
                const calls = actual.calls.count();
                const timesMessage = expected === 1 ? 'once' : `${expected} times`;
                result.pass = calls === expected;
                result.message = result.pass
                    ? `Expected spy ${actual.and.identity()} not to have been called ${timesMessage}. It was called ${calls} times.`
                    : `Expected spy ${actual.and.identity()} to have been called ${timesMessage}. It was called ${calls} times.`;
                return result;
            }
        };
    }
function assertMessageMatches(actual, expected) {
                if (expected instanceof RegExp) {
                    // assert.js doesn't have a built-in RegExp match function
                    assert.ok(expected.test(actual), `Expected '${actual}' to match ${expected}`);
                }
                else {
                    assert.strictEqual(actual, expected);
                }
            }
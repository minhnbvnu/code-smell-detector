function continueTest(subrouter) {
                try {
                    assert.strictEqual(subrouter.makeHref('test'), '/foo/baz/test');
                    done();
                } catch (e) {
                    fail(e);
                }
            }
function tryToCompare (x) {
                var err;
                try {
                    indexedDB.cmp(1, x);
                } catch (e) {
                    err = e;
                }

                if (env.isShimmed || !env.browser.isIE) {
                    expect(err).to.be.an.instanceOf(env.DOMException);
                }
                expect(err).to.be.ok; // eslint-disable-line no-unused-expressions
                expect(err.name).to.equal('DataError');
            }
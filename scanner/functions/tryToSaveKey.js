function tryToSaveKey (key) {
                        var err = null;

                        try {
                            store[save]({id: 1, name: {first: 'abc', last: key}});
                        } catch (e) {
                            err = e;
                        }

                        if (!env.isPolyfilled) {
                            expect(err).to.be.an.instanceOf(env.DOMException); // The polyfill throws a normal error
                        }
                        expect(err).to.be.ok;
                        expect(err.name).to.equal('DataError');
                    }
function tryToGet (key, IDBObj) {
                if (!IDBObj) {
                    tryToGet(key, store);
                    tryToGet(key, index);
                } else {
                    var err = null;

                    try {
                        IDBObj.openCursor(key);
                    } catch (e) {
                        err = e;
                    }

                    if (!env.isPolyfilled) {
                        expect(err).to.be.an.instanceOf(env.DOMException); // The polyfill throws a normal error
                    }
                    expect(err).to.be.ok;
                    expect(err.name).to.equal('DataError');
                }
            }
function tryToOpen (store) {
                var err = null;
                try {
                    tx.objectStore(store);
                } catch (e) {
                    err = e;
                }

                expect(err).to.be.an.instanceOf(env.DOMException);
                expect(err.name).to.equal('NotFoundError');
            }
function tryToSaveData (value) {
                        var err;

                        try {
                            store[save](value);
                        } catch (e) {
                            err = e;
                        }

                        expect(err).to.be.an.instanceOf(env.DOMException);
                        expect(err.name).to.equal('DataError');
                    }
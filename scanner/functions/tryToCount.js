function tryToCount (obj) {
                    var err = null;

                    try {
                        obj.count();
                    } catch (e) {
                        err = e;
                    }

                    expect(err).to.be.an.instanceOf(env.DOMException);
                    expect(err.name).to.equal('TransactionInactiveError');
                }
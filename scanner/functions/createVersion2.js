function createVersion2 () {
                    var open = indexedDB.open(name, 2);
                    open.onerror = open.onblocked = done;

                    open.onupgradeneeded = sinon.spy(function () {
                        var store = open.transaction.objectStore('My Store');

                        try {
                            store.createIndex('My Index', 'bar');
                        } catch (e) {
                            err = e;
                        }

                        expect(err).to.be.an.instanceOf(env.DOMException);
                        expect(err.name).to.equal('ConstraintError');
                    });

                    open.onsuccess = function () {
                        sinon.assert.calledOnce(open.onupgradeneeded);
                        open.result.close();
                        done();
                    };
                }
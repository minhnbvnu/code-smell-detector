function transaction2 () {
                    var open = indexedDB.open(name, 2);
                    open.onerror = open.onblocked = done;

                    open.onupgradeneeded = sinon.spy(function () {
                        // var db = event.target.result;
                        var store = open.transaction.objectStore('My Store');

                        expect(Array.prototype.slice.call(store.indexNames))
                            .to.have.same.members(['My Index 1', 'My Index 2', 'My Index 3']);

                        store.deleteIndex('My Index 2');

                        expect(Array.prototype.slice.call(store.indexNames))
                            .to.have.same.members(['My Index 1', 'My Index 3']);
                    });

                    open.onsuccess = function () {
                        sinon.assert.calledOnce(open.onupgradeneeded);
                        open.result.close();
                        done();
                    };
                }
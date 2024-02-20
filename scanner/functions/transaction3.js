function transaction3 () {
                var tx = db.transaction('inline', 'readwrite');
                var store = tx.objectStore('inline');
                tx.onerror = done;
                tx.oncomplete = checkResults;

                store.delete(1);
                store.delete(2);
                store.delete(3);
                store.delete(4);
                store.delete(5);

                util.getAll(store, function (err, data) {
                    if (err) {
                        expect(function () { throw err; }).to.not.throw(Error);
                        done();
                        return;
                    }
                    deletedData = data;
                });
            }
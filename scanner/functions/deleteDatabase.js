function deleteDatabase (name) {
            deletingCounter++;
            var del = indexedDB.deleteDatabase(name);
            del.onerror = sinon.spy();
            del.onsuccess = function () {
                sinon.assert.notCalled(del.onerror);

                if (++deletedCounter === deletingCounter) {
                    done();
                }
            };
        }
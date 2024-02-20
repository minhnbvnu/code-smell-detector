function createVersion7 () {
                    var open = indexedDB.open(name, 7);
                    open.onerror = open.onblocked = done;
                    open.onsuccess = function () {
                        expect(open.result.version).to.equal(7);
                        open.result.close();
                        setTimeout(createVersion4, env.transactionDuration);
                    };
                }
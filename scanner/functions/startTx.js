function startTx(db, mode, desc) {
                var tx = db.transaction('store', mode);
                tx.objectStore('store').get(1).onsuccess = function () {
                    // If this is one of the readwrite transactions or the first readonly after a readwrite, make sure we waited for all active transactions to finish before starting a new one
                    if (mode === 'readwrite' || started.length === 7) {
                        expect(started.length).equal(completed.length);
                    }

                    started.push(desc);
                    //console.log('start', desc);

                    tx.objectStore('store').get(2).onsuccess = function () {
                        tx.objectStore('store').get(3).onsuccess = function () {
                            tx.objectStore('store').get(4).onsuccess = function () {
                                tx.objectStore('store').get(5).onsuccess = function () {
                                    tx.objectStore('store').get(6);
                                };
                            };
                        };
                    };
                };
                tx.oncomplete = function () {
                    completed.push(desc);
                    //console.log('done', desc);

                    if (completed.length >= 12) {
                        done();
                    }
                };
            }
function createVersion5 () {
                    var open = indexedDB.open(name, 5);
                    open.onerror = open.onblocked = done;

                    open.onupgradeneeded = sinon.spy(function (event) {
                        var db = event.target.result;
                        expect(db.version).to.equal(5);
                        expect(event.oldVersion).to.equal(1);
                        expect(event.newVersion).to.equal(5);
                    });

                    open.onsuccess = function () {
                        sinon.assert.calledOnce(open.onupgradeneeded); // <-- only called once, not five times
                        open.result.close();
                        done();
                    };
                }
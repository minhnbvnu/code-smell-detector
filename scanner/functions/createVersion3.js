function createVersion3 () {
                    var open = indexedDB.open(name, 3);
                    open.onerror = open.onblocked = done;

                    open.onupgradeneeded = sinon.spy(function (event) {
                        var db = event.target.result;
                        expect(db.version).to.equal(3);
                        expect(event.oldVersion).to.equal(2);
                        expect(event.newVersion).to.equal(3);
                    });

                    open.onsuccess = function () {
                        sinon.assert.calledOnce(open.onupgradeneeded);
                        open.result.close();
                        done();
                    };
                }
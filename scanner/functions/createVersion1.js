function createVersion1 () {
                    var open = indexedDB.open(name, 1);
                    open.onerror = open.onblocked = done;

                    open.onupgradeneeded = sinon.spy(function (event) {
                        var db = event.target.result;
                        var store = db.createObjectStore('My Store');
                        store.createIndex('My Index', 'foo');
                    });

                    open.onsuccess = function () {
                        open.result.close();
                        setTimeout(createVersion2, 50);
                    };
                }
function transaction1 () {
                    var open = indexedDB.open(name, 1);
                    open.onerror = open.onblocked = done;

                    open.onupgradeneeded = function (event) {
                        var db = event.target.result;
                        var store = db.createObjectStore('My Store');
                        store.createIndex('My Index 1', 'foo');
                        store.createIndex('My Index 2', 'foo');
                        store.createIndex('My Index 3', 'foo');
                    };

                    open.onsuccess = function () {
                        open.result.close();
                        setTimeout(transaction2, 50);
                    };
                }
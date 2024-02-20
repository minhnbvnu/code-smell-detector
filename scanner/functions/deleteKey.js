function deleteKey (key) {
                deletingCounter++;
                var del = store.delete(key);
                del.onerror = done;
                del.onsuccess = function () {
                    deletedCounter++;
                };
            }
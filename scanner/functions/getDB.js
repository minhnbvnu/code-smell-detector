function getDB () {
  if (!db) {
    db = new Promise(function (resolve, reject) {
      var openreq = indexedDB.open('keyval-store', 1);

      openreq.onerror = function () {
        reject(openreq.error);
      };

      openreq.onupgradeneeded = function () {
        // First time setup: create an empty object store
        openreq.result.createObjectStore('keyval');
      };

      openreq.onsuccess = function () {
        resolve(openreq.result);
      };
    });
  }
  return db;
}
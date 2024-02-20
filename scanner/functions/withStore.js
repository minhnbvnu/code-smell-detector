function withStore (type, callback) {
  return getDB().then(function (db) {
    return new Promise(function (resolve, reject) {
      var transaction = db.transaction('keyval', type);
      transaction.oncomplete = function () {
        resolve();
      };
      transaction.onerror = function () {
        reject(transaction.error);
      };
      callback(transaction.objectStore('keyval'));
    });
  });
}
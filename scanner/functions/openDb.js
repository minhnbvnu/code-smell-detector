function openDb () {
    window.indexedDB.deleteDatabase(testData.DB.NAME);
    var dbOpenRequest = window.indexedDB.open(testData.DB.NAME);
    // eslint-disable-next-line promise/avoid-new
    return new Promise((resolve, reject) => {
        dbOpenRequest.onsuccess = function () {
            var db = dbOpenRequest.result;
            resolve(db);
        };
        dbOpenRequest.onerror = function (e) {
            expect(false, 'Database NOT Opened successfully').to.be.true;
            reject(e);
        };
    });
}
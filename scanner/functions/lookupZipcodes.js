function lookupZipcodes(city, callback) {
    withDB(db => {
        // As above, we create a transaction and get the object store
        let transaction = db.transaction(["zipcodes"]);
        let store = transaction.objectStore("zipcodes");

        // This time we also get the city index of the object store
        let index = store.index("cities");

        // Ask for all matching records in the index with the specified
        // city name, and when we get them we pass them to the callback.
        // If we expected more results, we might use openCursor() instead.
        let request = index.getAll(city);
        request.onerror = console.error;
        request.onsuccess = () => { callback(request.result); };
    });
}
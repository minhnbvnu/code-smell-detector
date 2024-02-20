function lookupCity(zip, callback) {
    withDB(db => {
        // Create a read-only transaction object for this query. The
        // argument is an array of object stores we will need to use.
        let transaction = db.transaction(["zipcodes"]);

        // Get the object store from the transaction
        let zipcodes = transaction.objectStore("zipcodes");

        // Now request the object that matches the specified zipcode key.
        // The lines above were synchronous, but this one is async.
        let request = zipcodes.get(zip);
        request.onerror = console.error;  // Log errors
        request.onsuccess = () => {       // Or call this function on success
            let record = request.result;  // This is the query result
            if (record) { // If we found a match, pass it to the callback
                callback(`${record.city}, ${record.state}`);
            } else {     // Otherwise, tell the callback that we failed
                callback(null);
            }
        };
    });
}
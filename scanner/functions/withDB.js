function withDB(callback) {
    let request = indexedDB.open("zipcodes", 1); // Request v1 of the database
    request.onerror = console.error;   // Log any errors
    request.onsuccess = () => {   // Or call this when done
        let db = request.result;  // The result of the request is the database
        callback(db);             // Invoke the callback with the database
    };

    // If version 1 of the database does not yet exist, then this event
    // handler will be triggered. This is used to create and initialize
    // object stores and indexes when the DB is first created or to modify
    // them when we switch from one version of the DB schema to another.
    request.onupgradeneeded = () => { initdb(request.result, callback); };
}
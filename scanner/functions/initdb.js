function initdb(db, callback) {
    // Create the object store, specifying a name for the store and
    // an options object that includes the "key path" specifying the
    // property name of the key field for this store.
    let store = db.createObjectStore("zipcodes", // store name
                                     { keyPath: "zipcode" });

    // Now index the object store by city name as well as by zip code.
    // With this method the key path string is passed directly as a
    // required argument rather than as part of an options object.
    store.createIndex("cities", "city");

    // Now get the data we are going to initialize the database with.
    // The zipcodes.json data file was generated from CC-licensed data from
    // www.geonames.org: https://download.geonames.org/export/zip/US.zip
    fetch("zipcodes.json")                  // Make an HTTP GET request
        .then(response => response.json())  // Parse the body as JSON
        .then(zipcodes => {                 // Get 40K zip code records
            // In order to insert zip code data into the database we need a
            // transaction object. To create our transaction object, we need
            // to specify which object stores we'll be using (we only have
            // one) and we need to tell it that we'll be doing writes to the
            // database, not just reads:
            let transaction = db.transaction(["zipcodes"], "readwrite");
            transaction.onerror = console.error;

            // Get our object store from the transaction
            let store = transaction.objectStore("zipcodes");

            // The best part about the IndexedDB API is that object stores
            // are *really* simple. Here's how we add (or update) our records:
            for(let record of zipcodes) { store.put(record); }

            // When the transaction completes successfully, the database
            // is initialized and ready for use, so we can call the
            // callback function that was originally passed to withDB()
            transaction.oncomplete = () => { callback(db); };
        });
}
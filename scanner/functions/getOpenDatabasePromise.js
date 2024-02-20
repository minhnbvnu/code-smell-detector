function getOpenDatabasePromise() {
        return deviceReadyDone.then(function () {
            if (typeof sqlitePlugin !== 'undefined' && typeof sqlitePlugin.openDatabase === 'function') {
                return sqlitePlugin.openDatabase;
            } else {
                throw new Error('SQLite plugin is not present.');
            }
        });
    }
function _initStorage(options) {
        var self = this;
        var dbInfo = {
            db: null
        };

        if (options) {
            for (var i in options) {
                dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
            }
        }

        var dbInfoPromise = getOpenDatabasePromise().then(function (openDatabase) {
            return new Promise(function (resolve, reject) {
                // Open the database; the openDatabase API will automatically
                // create it for us if it doesn't exist.
                try {
                    dbInfo.location = dbInfo.location || 'default';
                    dbInfo.db = openDatabase({
                        name: dbInfo.name,
                        version: String(dbInfo.version),
                        description: dbInfo.description,
                        size: dbInfo.size,
                        location: dbInfo.location
                    });
                } catch (e) {
                    reject(e);
                }

                // Create our key/value table if it doesn't exist.
                dbInfo.db.transaction(function (t) {
                    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' (id INTEGER PRIMARY KEY, key unique, value)', [], function () {
                        self._dbInfo = dbInfo;
                        resolve();
                    }, function (t, error) {
                        reject(error);
                    });
                });
            });
        });

        var serializerPromise = getSerializerPromise(self);
        var webSqlDriverPromise = getWebSqlDriverPromise(self);

        return Promise.all([serializerPromise, webSqlDriverPromise, dbInfoPromise]).then(function (results) {
            dbInfo.serializer = results[0];
            return dbInfoPromise;
        });
    }
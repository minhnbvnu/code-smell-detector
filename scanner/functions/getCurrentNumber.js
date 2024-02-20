function getCurrentNumber (tx, store, func, sqlFailCb) {
    tx.executeSql('SELECT "currNum" FROM __sys__ WHERE "name" = ?', [
        util.escapeSQLiteStatement(store.__currentName)
    ], function (tx, data) {
        if (data.rows.length !== 1) {
            func(1);
        } else {
            func(data.rows.item(0).currNum);
        }
    }, function (tx, error) {
        sqlFailCb(createDOMException(
            'DataError',
            'Could not get the auto increment value for key',
            error
        ));
        return false;
    });
}
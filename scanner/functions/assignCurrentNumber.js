function assignCurrentNumber (tx, store, num, successCb, failCb) {
    const sql = 'UPDATE __sys__ SET "currNum" = ? WHERE "name" = ?';
    const sqlValues = [num, util.escapeSQLiteStatement(store.__currentName)];
    if (CFG.DEBUG) { console.log(sql, sqlValues); }
    tx.executeSql(sql, sqlValues, function () {
        successCb(num);
    }, function (tx, err) {
        failCb(createDOMException('UnknownError', 'Could not set the auto increment value for key', err));
        return false;
    });
}
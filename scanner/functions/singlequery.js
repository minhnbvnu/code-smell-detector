function singlequery(sqls, cursor, callback) {
    if (cursor >= sqls.length) {
        callback(null);
        return;
    }
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, cursor);
            return;
        }
        conn.query(sqls[cursor], function (err) {
            if (err) console.log("SQL query Error: " + sqls[cursor] + "\n" + err)
            conn.release();
            singlequery(sqls, cursor + 1, callback);
        });
    });
}
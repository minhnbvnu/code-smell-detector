function singlequerywithresults(sqls, cursor, results, callback) {
    if (cursor >= sqls.length) {
        callback(null, results);
        return;
    }
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, cursor);
            return;
        }
        conn.query(sqls[cursor], function (err, rows) {
            if (err) console.log("SQL query Error: " + sqls[cursor] + "\n" + err);
            results.push(rows);
            conn.release();
            singlequerywithresults(sqls, cursor + 1, results, callback);
        });
    });
}
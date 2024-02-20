function getcookieuser(callback) {
    db.query("select email, password, name, hash, cookie from cookies", function (err, rows) {
        if (err) {
            cookieuser = null;
            callback(err);
        }
        else if (rows.length == 0) {
            cookieuser = null;
            callback("No cookie user in database.");
        }
        else {
            cookieuser = rows[0];
            callback();
        }
    })
}
function saveUsers(callback) {
    db.query("select id, hash from users", function (err, oldusers) {
        if (err) {
            callback(err);
            return;
        }
        var newusers = new Array();
        for (var i in users) {
            var found = false;
            for (var j in oldusers) {
                if (users[i].hash == oldusers[j].hash) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                newusers.push(users[i]);
                logger.log("New user added: id:'" + users[i].id + "' name:'" + users[i].name + "', has " + users[i].agree + " agree and " + users[i].follower + " followers.");
            }
        }
        users = null;
        userhashs = null;
        oldusers = null;
        //根据抓取结果，将新用户和修改内容的用户写入到用户表
        var sqls = new Array();
        for (var i in newusers) {
            sqls.push("INSERT INTO users (id, name, hash) VALUES ('" + newusers[i].id + "'," + db.escape(newusers[i].name) + ",'" + newusers[i].hash + "')");
        }
        db.mutliquery(sqls, function (err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, newusers.length);
            sqls = null;
            newusers = null;
        });
    });
}